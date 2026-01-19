# AWS CRUD React Project - AI Coding Instructions

## Architecture Overview

This is a **React + TypeScript SPA** that provides a CRUD interface for "widgets" backed by an **AWS API Gateway + Lambda** serverless API. The frontend is deployed to **S3 as a static site**.

### Data Flow
1. User interacts with page components ([src/components](src/components))
2. Page components call async API functions ([src/api/widgets.ts](src/api/widgets.ts))
3. API functions hit AWS API Gateway endpoint (`vlao80eelj.execute-api.eu-west-1.amazonaws.com`)
4. State is managed via React hooks (`useState`, `useEffect`) - **no global state management**

### Key Architectural Decisions
- **Page-level components** handle routing, state, and async logic (e.g., [ItemPage.tsx](src/components/ItemPage.tsx))
- **Display/form components** are presentational and receive props (e.g., [ItemEdit.tsx](src/components/ItemEdit.tsx))
- API URL is **hardcoded** in [widgets.ts](src/api/widgets.ts) - change `AWS_API_ID` constant to point to different environments

## Developer Workflows

### Running Locally
```bash
npm run dev           # Starts dev server on localhost:3000 (auto-opens browser)
```

### Testing
```bash
npm test              # Runs Vitest in watch mode
```
- Tests use `@testing-library/react` with jsdom environment
- Setup file: [vitest.setup.ts](vitest.setup.ts) - extends matchers and runs cleanup
- Example: [App.test.jsx](src/App.test.jsx)

**Dependency Injection for Testing:**
- Page components accept optional API function props for testing with stubs
- Example: [ListPage.tsx](src/components/ListPage.tsx) accepts `getWidgetsAsync` prop
- Test example: [ListPage.test.tsx](src/components/ListPage.test.tsx) - shows how to inject stub implementations
- Pattern: `function ListPage({ getWidgetsAsync: prop = actual })` with default parameter

### Building & Deploying
```bash
npm run build         # TypeScript compile + Vite build → build/ folder
npm run deploy-web    # Syncs build/ to S3 bucket (requires AWS CLI configured)
```
- Deployment script: [aws/deploy-web.bat](aws/deploy-web.bat) - uses `aws s3 sync` to `algo-pop-react-test` bucket
- **No CI/CD** - manual deployment via npm scripts

## Project-Specific Conventions

### Naming Patterns
- **Generic names throughout**: Components use "Item" terminology despite domain being "Widgets"
  - `ItemList`, `ItemPage`, `ItemEdit` work with `Widget` types
  - This inconsistency is intentional - maintain it when adding features
- **Async suffix**: All API functions end with `Async` (e.g., `getWidgetsAsync`, `updateWidgetAsync`)

### Type System ([model/widget.ts](src/model/widget.ts))
```typescript
WidgetContent        // name, cost, weight (no id) - for creation
Widget               // WidgetContent + id - for read/update
WidgetCollection     // { items: Widget[] } - API list response
WidgetFormContent    // Form element types for event handling
```

### State Management Pattern
Page components use a **state machine approach** with discriminated unions:
```typescript
type PageState = "loading" | "editing" | "saving" | "deleting" | "display" | { status: "error", message: string }
```
See [ItemPage.tsx](src/components/ItemPage.tsx#L11-L17) for reference.

### Form Handling
- Uses **native form submission** with `FormEvent<HTMLFormElement>`
- Type assertion pattern: `event.target as (typeof event.target) & WidgetFormContent`
- String-to-number coercion: `+form.cost.value`
- See [NewItem.tsx](src/components/NewItem.tsx#L5-L14) and [ItemEdit.tsx](src/components/ItemEdit.tsx#L11-L23)

### Routing
- React Router v7 with file-based route structure
- Routes defined in [App.tsx](src/App.tsx):
  - `/widgets` - List all widgets
  - `/new-widget` - Create form
  - `/widgets/:widgetId` - Edit/delete existing widget
- Navigation uses `navigate()` hook with `replace: true` after deletion to prevent back-button issues

## Integration Points

### AWS API Contract
All endpoints expect/return JSON. Base URL pattern:
```
https://{AWS_API_ID}.execute-api.{region}.amazonaws.com/widgets
```

**Endpoints:**
- `GET /widgets` → `{ items: Widget[] }`
- `GET /widgets/{id}` → `Widget`
- `POST /widgets` + body: `WidgetContent` → `WidgetId`
- `PUT /widgets/{id}` + body: `Widget` → `Widget`
- `DELETE /widgets/{id}` → 204 No Content

**Error handling:** All API functions throw `new Error(message)` on non-ok responses - catch in components.

### Build Tooling
- **Vite** used for fast builds and dev server
- Port 3000 hardcoded in config
- Strict TypeScript with noUnusedLocals, noImplicitReturns enabled
- Uses bundler module resolution (not Node16)

## When Adding Features

1. **New entity types**: Follow the Widget pattern - create types in `model/`, API functions in `api/`, and component hierarchy (Page → List/Detail/Edit components)
2. **Environment config**: Currently no env variable setup - API ID is hardcoded. If adding multiple environments, create a config file
3. **Global state**: None exists - if needed, consider Context API or lightweight solution (no Redux/Zustand in dependencies)
4. **Styling**: Minimal CSS in [App.css](src/App.css) and [index.css](src/index.css) - no component library (no Material-UI/Ant Design)
