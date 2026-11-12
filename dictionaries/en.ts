// All en site copy, merged from one JSON file per page area in dictionaries/en/.
import site from './en/site.json'
import opening from './en/opening.json'
import chapters from './en/chapters.json'
import work from './en/work.json'
import ending from './en/ending.json'

const en = { ...site, ...opening, ...chapters, ...work, ...ending }
export default en
