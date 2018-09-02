// import ReactNextPaging from './react-next-paging'
import ReactNextPaging, { getNoPages } from "./react-next-paging";

/*
 * Fix importing in typescript after rollup compilation
 * https://github.com/rollup/rollup/issues/1156
 * https://github.com/Microsoft/TypeScript/issues/13017#issuecomment-268657860
 */
ReactNextPaging.default = ReactNextPaging;
// getNoPages.default = getNoPages;

// export default ReactNextPaging
// export getNoPages
export default ReactNextPaging;
