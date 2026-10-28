# F07 · Request Details — API MAP (Gate A)

**Gate A:** PASS — backend spec paths documented (never called).

## Request-detail specs (from `backend-api-swagger/`)

| Surface | Spec path (documented) |
|---|---|
| Request detail | `GET /api/v1/requests/{request_id}` |
| Request quotes | `GET /api/v1/requests/{request_id}/quotes` |
| Attachment media | `GET /api/v1/media/{id}/url` |

## Honest notes

- No live backend: all paths are documentation of verified spec paths, never calls.
- The approve/changes/message actions are demo-labelled; no request-action endpoint is called.
