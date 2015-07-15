import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';
import extract from 'flarum/utils/extract';

/**
 * The `Button` component defines an element which, when clicked, performs an
 * action. The button may have the following special props:
 *
 * - `icon` The name of the icon class. If specified, the button will be given a
 *   'has-icon' class name.
 * - `disabled` Whether or not the button is disabled. If truthy, the button
 *   will be given a 'disabled' class name, and any `onclick` handler will be
 *   removed.
 *
 * All other props will be assigned as attributes on the button element.
 *
 * Note that a Button has no default class names. This is because a Button can
 * be used to represent any generic clickable control, like a menu item.
 */
export default class Button extends Component {
  view() {
    const attrs = Object.assign({}, this.props);

    delete attrs.children;

    attrs.className = (attrs.className || '');
    attrs.href = attrs.href || 'javascript:;';

    const iconName = extract(attrs, 'icon');
    if (iconName) attrs.className += ' has-icon';

    const disabled = extract(attrs, 'disabled');
    if (disabled) {
      attrs.className += ' disabled';
      delete attrs.onclick;
    }

    return <a {...attrs}>{this.getButtonContent()}</a>;
  }

  /**
   * Get the template for the button's content.
   *
   * @return {*}
   * @protected
   */
  getButtonContent() {
    const iconName = this.props.icon;

    return [
      iconName ? icon(iconName) : '',
      <span className="label">{this.props.children}</span>
    ];
  }
}
