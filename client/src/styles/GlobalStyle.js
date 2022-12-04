/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
    --color-main-green: #005034;
    --color-secondary-blue: #2B46BD;
    --color-secondary-green:#036243;
    --color-yellow: #EDD947;
    --color-border: #005034;
    --font-heading: 'Fredoka One', 'cursive';
    --font-body: 'Varela Round', sans-serif;
    --font-logo: 'Cedarville Cursive','cursive';
;
    --padding-page: 24px;
  }

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  height: 100%;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

h1{
  color: #005034;
  font-family: var(--font-heading);
  font-size: 40px;
}
h2{
  color: var(--color-secondary-blue);
  font-family: var(--font-heading);
  font-size: 30px;
  margin:5px;
}
h3{
  color: var(--color-secondary-blue);
  font-family: var(--font-heading);
  font-size: 16px;
  margin:5px
}

p{
  color: black;
  font-family: var(--font-body);
  font-size: 18px;
  margin: 5px;
}

a{
  all: unset;
  color: var(--color-secondary-blue);
  font-family: var(--font-heading);
  font-size: 16px;
  &:hover{
    font-weight: bolder;
  }
  &:visited{
    color: var(--color-secondary-blue);
  font-family: var(--font-heading);
  font-size: 16px;

  }
}

button{
  background-color: var(--color-secondary-green);
  color: var(--color-yellow);
  font-family: var(--font-heading);
  font-size: 18px;
  padding: 10px ;
  border-radius: 10px;
  border: solid transparent 3px;
  margin: 4px 8px;
  max-height: 80px;
  box-sizing: content-box;
  transition: color .3s, background-color .3s, border .3s;
  position: relative;
  &:hover{
    border: solid var(--color-secondary-green) 3px;
    background-color: var(--color-yellow);
    color: var(--color-secondary-green);
  }
}

`;

export default GlobalStyle;
