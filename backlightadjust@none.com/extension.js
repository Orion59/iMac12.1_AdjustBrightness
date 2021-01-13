/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'my-indicator-extension';

const { GObject, St } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Util = imports.misc.util;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('My Shiny Indicator'));

        let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
        box.add_child(new St.Icon({
            icon_name: 'display-brightness-symbolic',
            style_class: 'system-status-icon',
        }));
        box.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));
        this.add_child(box);

	let item1 = new PopupMenu.PopupMenuItem("25%",{ style_class: 'subpopup' });
        item1.connect('activate', () => {
            Util.spawnCommandLine('xrandr --output eDP --brightness 0.25');
        });
        this.menu.addMenuItem(item1);

        let item2 = new PopupMenu.PopupMenuItem("50%",{ style_class: 'subpopup' });
        item2.connect('activate', () => {
            Util.spawnCommandLine('xrandr --output eDP --brightness 0.50');
        });
        this.menu.addMenuItem(item2);

        let item3 = new PopupMenu.PopupMenuItem("75%",{ style_class: 'subpopup' });
        item3.connect('activate', () => {
            Util.spawnCommandLine('xrandr --output eDP --brightness 0.75');
        });
        this.menu.addMenuItem(item3);

        let item4 = new PopupMenu.PopupMenuItem("100%",{ style_class: 'subpopup' });
        item4.connect('activate', () => {
            Util.spawnCommandLine('xrandr --output eDP --brightness 1');
        });
        this.menu.addMenuItem(item4);

    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
