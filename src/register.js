import { ButtonControl, LinkTo, TitledParagraphControl } from './controls'
import {
  CheckboxControl,
  CheckboxListControl,
  EmailControl,
  PasswordControl,
  TextareaControl,
  TextboxControl,
} from './forms'
import { registerControl } from './helpers'

/**
 * Polyfill for url-pattern
 * as still expiremental feature
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URLPattern
 */
import 'urlpattern-polyfill'

// Register general controls
registerControl(ButtonControl)
registerControl(LinkTo, 'link-to')
registerControl(TitledParagraphControl)
// Register form controls
registerControl(CheckboxControl)
registerControl(CheckboxListControl)
registerControl(EmailControl)
registerControl(PasswordControl)
registerControl(TextareaControl)
registerControl(TextboxControl)
