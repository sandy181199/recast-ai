-- RecastAI Database Schema
-- Run this in Supabase SQL Editor

-- Users (synced from Clerk via webhook)
create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  clerk_id      text unique not null,
  email         text not null,
  plan          text not null default 'free', -- 'free' | 'pro' | 'team'
  created_at    timestamptz default now()
);

-- Repurposings (each AI run)
create table if not exists repurposings (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references users(id) on delete cascade not null,
  input_text    text not null,
  input_type    text not null default 'text',       -- 'text' | 'youtube'
  input_url     text,                                -- YouTube URL if applicable
  tone          text not null default 'professional', -- 'professional' | 'casual' | 'witty'
  outputs       jsonb,          -- { linkedin, twitter, newsletter, youtube, tldr }
  created_at    timestamptz default now()
);

-- Monthly usage tracking (for free plan gate)
create table if not exists usage_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references users(id) on delete cascade not null,
  month         text not null,  -- 'YYYY-MM'
  count         integer not null default 0,
  unique(user_id, month)
);

-- Subscriptions (managed by Stripe webhooks)
create table if not exists subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid references users(id) on delete cascade not null,
  stripe_customer_id     text,
  stripe_subscription_id text unique,
  plan                   text not null default 'free',
  status                 text not null default 'active', -- 'active' | 'canceled' | 'past_due'
  period_end             timestamptz,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

-- Indexes
create index if not exists idx_users_clerk_id          on users(clerk_id);
create index if not exists idx_repurposings_user_id    on repurposings(user_id);
create index if not exists idx_repurposings_created_at on repurposings(created_at desc);
create index if not exists idx_usage_logs_user_month   on usage_logs(user_id, month);
create index if not exists idx_subs_user_id            on subscriptions(user_id);

-- Row Level Security (belt-and-suspenders, service role bypasses this)
alter table users          enable row level security;
alter table repurposings   enable row level security;
alter table usage_logs     enable row level security;
alter table subscriptions  enable row level security;

-- Upsert + increment usage count atomically
create or replace function increment_usage(p_user_id uuid, p_month text)
returns integer language plpgsql as $$
declare
  new_count integer;
begin
  insert into usage_logs (user_id, month, count)
  values (p_user_id, p_month, 1)
  on conflict (user_id, month)
  do update set count = usage_logs.count + 1
  returning count into new_count;
  return new_count;
end;
$$;
