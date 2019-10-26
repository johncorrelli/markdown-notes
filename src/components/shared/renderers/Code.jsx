//@flow
import React, {useEffect, useRef} from 'react';
import syntaxHighlighting from '../../../helpers/syntax-highlighting';

type Props = {
  value: string,
  language: string,
};

const Code = ({value, language}: Props) => {
  const codeRef = useRef();

  useEffect(() => {
    syntaxHighlighting(codeRef.current);
  }, [value, language]);

  return (
    <pre>
      <code className={`language-${language}`} ref={codeRef}>
        {value}
      </code>
    </pre>
  );
};

export default Code;
