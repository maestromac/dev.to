import { h, render } from 'preact';
import SidebarWidget from './SidebarWidget';

console.log("i see you")

HTMLDocument.prototype.ready = new Promise(resolve => {
  if (document.readyState !== 'loading') {
    return resolve();
  }
  document.addEventListener('DOMContentLoaded', () => resolve());
});

if (document.getElementById('widget-00001') === null) {
  render(<SidebarWidget />, document.getElementById('sidebarWidget__pack'));
}
