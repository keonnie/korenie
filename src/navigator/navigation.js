/**
 * Get the main document of
 * the application
 * @param {Event} evt
 * @returns {HTMLDocument} document
 */
function getDocument(evt) {
  return evt.target?.ownerDocument ?? globalThis.document
}

/**
 * Handle when user press back
 * button on navigator
 * Send event transition to all listener
 * as the application need to load the
 * appropriate view.
 * @param {Event} evt
 */
export function back(evt) {
  let doc = getDocument(evt)
  doc.querySelector('control-app').dispatchEvent(new CustomEvent('transition'))
}

/**
 * Define the tab display text
 * @param {Event} evt
 */
export function title(evt) {
  let doc = getDocument(evt)
  doc.querySelector('title').textContent =
    doc.querySelector('control-app').dataset?.apptitle || 'Keonnie'
}

export default { back, title }
