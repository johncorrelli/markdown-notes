import type {Element} from 'hast';
import type {ComponentPropsWithoutRef} from 'react';
import highlightCode from '../../../helpers/syntax-highlighting';

type Props = ComponentPropsWithoutRef<'pre'> & {
  node?: Element;
};

/** Pulls the source text and fence language out of a <pre><code> block. */
const getCode = (node: Element | undefined) => {
  const code = node?.children[0];

  if (!code || code.type !== 'element' || code.tagName !== 'code') {
    return null;
  }

  const {className} = code.properties;
  const languageClass = Array.isArray(className)
    ? className.map(String).find(name => name.startsWith('language-'))
    : undefined;

  return {
    language: languageClass?.slice('language-'.length),
    // the markdown parser appends a trailing newline to fenced code
    text: code.children
      .map(child => (child.type === 'text' ? child.value : ''))
      .join('')
      .replace(/\n$/, ''),
  };
};

const CodeBlock = ({node, children, ...props}: Props) => {
  const code = getCode(node);

  if (!code) {
    return <pre {...props}>{children}</pre>;
  }

  const languageClassName = code.language
    ? `language-${code.language}`
    : undefined;
  const html = highlightCode(code.text, code.language);

  return (
    <pre {...props}>
      {html === null ? (
        <code className={languageClassName}>{code.text}</code>
      ) : (
        // highlight.js escapes the source before wrapping tokens in spans
        <code
          className={`hljs ${languageClassName}`}
          dangerouslySetInnerHTML={{__html: html}}
        />
      )}
    </pre>
  );
};

export default CodeBlock;
