# Auth UI Spec (Task 7.1)

## Objective
Establish structural + conceptual design for Login and Registration flows without yet wiring validation or API integration.

## Delivery Model
For MVP, forms are standalone components mounted inside the existing `AppLayout`. A future routing layer or modal system can wrap them with no breaking changes. Temporary toggle will allow switching forms during development.

## Forms & Fields
| Form | Fields | Notes |
|------|--------|-------|
| Login | email, password | Basic credential entry |
| Register | email, password, confirmPassword, (optional name - deferred) | confirmPassword must match password |

## Validation (Planned for 7.4)
- Email: RFC basic format
- Password: min 8 chars (extendable for complexity later)
- Confirm Password: equality check
- Trimming of surrounding whitespace

## Accessibility
- Labels explicitly associated via `htmlFor`
- Error messaging region (role="alert") will be added in later subtasks
- Forms named via `aria-label`
- Focus styles rely on Tailwind ring utilities

## Visual & Layout
- Centered column, max width 24rem (Tailwind max-w-sm)
- Soft translucent panel with backdrop-blur for consistency with landing style language
- Mobile-first spacing; vertical rhythm ~24px groups

## Theming
- Uses existing neutral & indigo palette; inherits dark mode from root

## Future Enhancements (Deferred)
- Password visibility toggle
- Remember me / persistent session option
- Social login buttons
- Forgot password flow
- Rate limiting / lockout messaging after repeated failures

## File Map
- `src/components/auth/AuthLayout.tsx` – wrapper
- `src/components/auth/LoginForm.tsx` – login form skeleton
- `src/components/auth/RegisterForm.tsx` – registration form skeleton
- `src/components/auth/index.ts` – barrel export
- `src/lib/auth.ts` – placeholder API module (implemented later)
- `src/components/auth/AUTH_SPEC.md` – this document

## Risks & Notes
- Token persistence approach TBD (localStorage vs cookie) — documented for later security hardening.
- Avoid over-engineering until integration & validation subtasks.

## Sign-off Checklist for 7.1
- [x] Skeleton components present
- [x] Spec documented
- [x] No runtime errors during build (pending test)
- [ ] Temporary mount path prepared in `App.tsx` (next step)
