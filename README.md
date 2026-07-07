# PayPlan — Product Overview

## What PayPlan Is

PayPlan is a **group payment collection tool** that helps one person collect recurring payments from many people in one place, with complete visibility into who has paid and who hasn't.

Think of it as **a treasurer's spreadsheet that actually works.**

Instead of chasing people for money every month, you create a group once, share payment links, and PayPlan automates the recurring collections while tracking everyone's payment status.

---

# The Core Problem It Solves

## The Pain

Managing recurring group payments usually means:

- Sending manual reminders every month
- Tracking payments in spreadsheets
- Chasing people who haven't paid
- Constantly wondering who has paid and who hasn't

## The Solution

PayPlan automates recurring collections.

Create the group once, invite payers, and PayPlan handles:

- Payment collection
- Payment tracking
- Status updates
- Collection visibility

---

# Real-World Use Cases

| Use Case | How It Works |
|-----------|--------------|
| Rent Collection | Landlord or head tenant collects rent from roommates every month |
| School Fees | School administrators collect fees from parents |
| Estate Levies | Estate managers collect maintenance dues |
| Trade Credit | Businesses collect installment repayments |
| Club Dues | Treasurers collect recurring membership fees |
| Group Gifts | Organizers collect contributions for gifts or events |

---

# Key Features

## 1. Create a Group (Cohort)

The organizer creates a payment group by providing:

- Group name
- Payment frequency (weekly, monthly, quarterly, etc.)
- Start date
- Optional end date
- Destination bank account
- List of payers and their individual payment amounts

### Example

> "I need to collect ₦500,000 rent from five roommates every month beginning January 1st. All payments go directly to Landlord Chidi's account."

---

## 2. Add Payers

Each payer includes:

- Name
- Email address
- Individual payment amount

Each payer can have a completely different amount.

### Example

| Payer | Amount |
|--------|---------|
| Alice | ₦100,000 |
| Bob | ₦100,000 |
| Charlie | ₦100,000 |
| Diana | ₦100,000 |
| Edward | ₦100,000 |

---

## 3. Share Payment Links

PayPlan generates a **unique payment link** for every payer.

The organizer can share it through:

- WhatsApp
- Email
- SMS
- Any preferred communication channel

### The payer sees

- Payment amount
- Billing frequency
- First charge amount
- Any prorated charges (if applicable)
- Secure card authorization page

---

## 4. Payer Onboarding

The payer simply:

1. Opens their unique link
2. Reviews payment details
3. Enters card information
4. Authorizes recurring payments

Setup takes less than **2 minutes**.

### No Account Required

Payers never need to:

- Create an account
- Remember a password
- Install an app

They simply click and authorize payments.

---

## 5. Organizer Dashboard

Everything is managed from a single dashboard.

### Group Summary

Displays:

- Total expected collection
- Amount collected
- Collection percentage
- Active payers
- Invited payers

---

### Payer List

Each payer displays:

- Name
- Amount
- Status
- Join date
- Last payment date

---

### Payer Statuses

| Status | Meaning |
|----------|----------|
| Invited | Link sent but payer hasn't completed setup |
| Active | Paying automatically |
| Paused | Payments temporarily suspended |
| Failed | Payment failed after all retries |
| Cancelled | Payer removed from the group |

---

## 6. Batch Actions

Organizers can manage everyone at once.

Available actions include:

- Pause All
- Resume All
- Retry Failed Payments

---

## 7. Individual Payer Management

Manage payers individually by:

- Adding new payers
- Removing payers
- Updating payment amounts
- Resending payment links

Amount updates take effect from the **next billing cycle**.

---

## 8. Mid-Cycle Joins

When someone joins after a billing cycle has started, choose how they're charged.

| Mode | Description | Best For |
|------|-------------|-----------|
| Next Cycle | No payment until the next cycle | Crowdfunding, subscriptions |
| Pro-rated | Pay only for the remaining portion of the current cycle | Rent, utilities |
| Full Cycle | Pay the full cycle amount immediately | Memberships, fixed commitments |

---

## 9. Saved Bank Accounts

Frequently-used bank accounts can be saved.

Example:

- Landlord's Account
- School Fees Account
- Estate Maintenance Account

Simply select one when creating future groups.

---

## 10. Transaction History

View every payment including:

- Amount
- Date
- Payer
- Billing cycle
- Payment status

---

## 11. Visibility Settings

Choose what payers can see.

### Closed Group (Default)

Payers only see:

- Their own plan
- Their own payment status

---

### Open Group

Payers see:

- Overall collection progress

Example:

> **3 of 5 members have paid**

They **cannot** see:

- Names
- Individual payment amounts

---

# User Journey

## Organizer Experience

1. Sign in
2. Create a payment group
3. Add payers
4. Share payment links
5. Monitor collections
6. Manage payers
7. Track payments

---

## Payer Experience

1. Receive payment link
2. Review payment details
3. Enter card information
4. Authorize recurring payments
5. Done

No account creation required.

---

# What Happens Next

After setup:

- Payments are collected automatically
- Receipts are sent
- Dashboard updates automatically
- Failed payments are retried
- Organizers receive notifications if retries fail

---

# What PayPlan Does NOT Do

| Feature | Status | Reason |
|----------|--------|--------|
| Bank transfers | ❌ | Managed by Sub |
| Automatic redistribution | ❌ | Organizer adjusts payer amounts manually |
| Refund processing | ❌ | Handled outside PayPlan |
| Percentage-based splits | ❌ | Fixed payment amounts only |
| Automatic link delivery | ❌ | Organizer shares links manually |
| Multiple organizers | ❌ | One organizer per group |
| Payer-controlled amount changes | ❌ | Only organizers can edit payment amounts |

---

# In One Sentence

> **PayPlan is a group payment orchestrator that enables one person to collect recurring payments from many people, while providing complete visibility into payment status without handling the underlying banking infrastructure.**

---

# Value Proposition

## For Organizers

- Stop chasing people for payments
- Automate recurring collections
- Track every payer from one dashboard
- Monitor payment progress in real time
- Manage groups with minimal manual effort

---

## For Payers

- No account required
- One-time setup
- Automatic recurring payments
- No reminders
- No spreadsheets
- No manual transfers
- Just click, authorize, and you're done.

## Tech Stack
This project uses:
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Lucide React (Icons)
