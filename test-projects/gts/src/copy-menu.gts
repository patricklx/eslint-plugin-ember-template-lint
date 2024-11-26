import Component from '@glimmer/component';
import { on } from '@ember/modifier';

let { getSnippetElement, toClipboard, withExtraStyles }  = {} as {
  getSnippetElement: unknown,
  toClipboard: unknown,
  withExtraStyles: unknown,
};
import Menu from './menu';

/**
 * This component is injected via the markdown rendering
 */
export default class CopyMenu extends Component {
  copyAsText = (event: Event) => {
    let code = getSnippetElement(event) as unknown;

    void navigator.clipboard.writeText(code.innerText as string);
  };

  copyAsImage = async (event: Event) => {
    let code = getSnippetElement(event) as unknown;

    await withExtraStyles(code, () => toClipboard(code) as void);
  };

  <template>
    <Menu data-test-copy-menu>
      <:trigger as |t|>
        <t.Default class="absolute top-3 right-4 z-10" data-test-copy-menu>
          📋
        </t.Default>
      </:trigger>

      <:options as |Item|>
        <Item {{on "click" this.copyAsText}}>
          Copy as text
        </Item>
        <Item {{on "click" this.copyAsImage}}>
          Copy as image
        </Item>
      </:options>
    </Menu>
  </template>
}
