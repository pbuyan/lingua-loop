# Task: Migrate Client Attributes Tab from C# Heavy-Client to Web

## Context
- Existing project with a dummy/stub implementation of a Client Attributes tab that needs 
  to be replaced or modified to meet the specifications below.
- Tech stack: React + TypeScript + Campfire (Morgan Stanley internal UI framework) + 
  ag-grid + Playwright + @testing-library/react.
- Before writing code: inspect the existing dummy implementation, existing Campfire 
  component usage patterns, ag-grid wrappers, API client setup, and test utilities in 
  this repo. Reuse existing patterns; do not introduce new libraries.

## Goal
Replace the C# heavy-client Client Attributes tab with a web tab that loads data from 
existing QA APIs, supports category-first column selection, pinned identity columns, 
inline editing for single- and multi-value attributes, definition-driven UI behavior, 
and saved views with deep-link filter state.

## Functional Requirements

### Data Loading
- Load attribute definitions via `GET /getClientAttributeDefinitions`.
- Load client rows with regions and attributes via 
  `POST /getClientsWithRegionAndAttributes`.
- Supplementary data: `GET /getAllClientDetails`, `POST /getAllClientMetaRules`.
- Every API call must include the required `clientInfo` header; `requestId` is optional 
  but include it for traceability.

### Grid Structure
- Use ag-grid (via the existing repo wrapper if present).
- Pin the 3 left-most columns during horizontal scroll: `Trading Name ID`, `Client Name`, 
  `Region`. Confirm final column names/mapping via a single `PINNED_COLUMNS` constant so 
  they are easy to adjust.
- Dynamic columns are driven by attribute definitions, grouped by Category, with Field 
  as the leaf column.

### Column Chooser
- Category-first chooser: user picks Categories, then Fields under each Category.
- Grid updates to show selected fields in the configured order.
- Chooser state is part of the saved-view payload.

### Inline Editing
- Support inline edit + save for single-value attributes.
- Support multi-value editing where `allowMultiple === true` (chips/multi-select using 
  the Campfire equivalent).
- Persist via `POST /updateClientAttribute`; support `POST /deleteClientAttribute` for 
  value removal.
- Optimistic update with rollback on failure; define a refetch fallback for conflict 
  scenarios.
- Never freeze the UI during save operations — saves are async and per-cell.

### Definition-Driven UI Behavior
- Render editors based on attribute definition: options list (dropdown), free text, 
  number, date, multi-select for `allowMultiple=true`.
- If an attribute is `readonly` or `inactive`, block edit at the UI level with a clear 
  tooltip/visual cue (do not rely solely on backend rejection).
- Validate against options list before save; show inline validation messaging and 
  prevent save on invalid input.

### Saved Views & Deep Links
- Saved view captures: selected categories/fields, column order, pinned columns, 
  filters, sort.
- Encode filter + view state in URL query params so deep links restore filters and 
  selected columns on load.
- Applying a saved view or opening a deep link restores the grid to the exact prior state.

## Non-Functional Requirements
- Initial table load in QA under 3 seconds for a typical dataset.
- Smooth horizontal/vertical scroll on larger datasets (virtualize via ag-grid; avoid 
  unnecessary re-renders — memoize column defs, row data transforms).
- No UI freeze during saves.

## Out of Scope
- Backend redesign/refactor.
- Permission model changes.
- Migration of other heavy-client tabs.

## Deliverables

### Code
1. React component(s) for the new Client Attributes tab using Campfire + ag-grid.
2. Typed API client module for the 5 endpoints above with `clientInfo` header 
   auto-injection.
3. TypeScript types for attribute definitions, client rows, meta rules, save/delete 
   payloads.
4. Column-chooser component (category → field) wired to grid column state.
5. Saved-views + deep-link serialization/deserialization utility.
6. Cell editor components per attribute type, honoring `readonly`, `inactive`, 
   `allowMultiple`, and `options`.

### Tests
- **Unit (@testing-library/react):**
  - Mapping attribute definitions → dynamic columns by category/field.
  - Editor behavior for `allowMultiple`, `readonly`/`inactive`, options validation.
- **Integration:**
  - Endpoint orchestration for load/edit/save/delete and refetch on conflict.
  - Header handling: `clientInfo` present, `requestId` forwarded, error-state handling.
- **E2E (Playwright):**
  - Column selection via category-first chooser.
  - Pinned-column behavior during horizontal scroll.
  - Inline edit + save for single-value and multi-value attributes.
  - Saved views apply correctly; deep-link URL restores filters and columns.

## Acceptance Criteria (BDD)

**Happy Path**
- Given a user opens the new Client Attributes web tab, when the page loads, then 
  attribute definitions and client rows display with pinned Trading Name ID, Client 
  Name, and Region.
- Given the user opens the column picker, when they select categories and fields, then 
  the grid updates to show selected fields in the configured order.
- Given a field is editable, when the user updates a single- or multi-value attribute 
  and saves, then changes persist via the update API and the grid refreshes without 
  losing context (scroll position, selection, expanded state).
- Given saved views are configured, when a user applies a saved view or opens a 
  deep-link URL, then filters and selected columns restore correctly.

**Edge Cases**
- Given an attribute is readonly or inactive, when a user attempts to edit, then the 
  edit is blocked with clear UI feedback.
- Given an attribute has options validation, when invalid values are entered, then save 
  is prevented and validation messaging is shown.
- Given an API save/delete fails, when the request returns an error, then the user sees 
  error feedback and can retry without data loss (optimistic state rolls back, input 
  preserved).

## Working Style
- Start by listing files you plan to create or modify before writing code.
- Ask me before installing any new dependency.
- Match the existing repo's file structure, naming conventions, and import aliases.
- Keep PR-sized commits; group by: types + API client → grid + columns → column chooser 
  → editors → saved views/deep links → tests.
- Flag any ambiguity in column-name mapping, multi-value payload shape, or 
  optimistic-save conflict behavior as open questions rather than guessing.
