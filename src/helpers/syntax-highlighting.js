import hljs from 'highlight.js/lib/highlight';
import apache from 'highlight.js/lib/languages/apache';
import bash from 'highlight.js/lib/languages/bash';
import coffeescript from 'highlight.js/lib/languages/coffeescript';
import cpp from 'highlight.js/lib/languages/cpp';
import cs from 'highlight.js/lib/languages/cs';
import css from 'highlight.js/lib/languages/css';
import diff from 'highlight.js/lib/languages/diff';
import http from 'highlight.js/lib/languages/http';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import makefile from 'highlight.js/lib/languages/makefile';
import markdown from 'highlight.js/lib/languages/markdown';
import nginx from 'highlight.js/lib/languages/nginx';
import objectivec from 'highlight.js/lib/languages/objectivec';
import perl from 'highlight.js/lib/languages/perl';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';

import 'highlight.js/styles/github-gist.css';

hljs.registerLanguage('apache', apache);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('coffeescript', coffeescript);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('cs', cs);
hljs.registerLanguage('css', css);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('http', http);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('makefile', makefile);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('objectivec', objectivec);
hljs.registerLanguage('perl', perl);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('xml', xml);

export default function highlightBlock(element) {
  if (element) {
    hljs.highlightBlock(element);
  }
}
