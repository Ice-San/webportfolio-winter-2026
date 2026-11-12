// All pt site copy, merged from one JSON file per page area in dictionaries/pt/.
import site from './pt/site.json'
import opening from './pt/opening.json'
import chapters from './pt/chapters.json'
import work from './pt/work.json'
import ending from './pt/ending.json'

const pt = { ...site, ...opening, ...chapters, ...work, ...ending }
export default pt
