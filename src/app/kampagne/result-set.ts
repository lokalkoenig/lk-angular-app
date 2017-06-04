
import { Kampagne } from './kampagne';
import { Facet } from './facet';

export class ResultSet {
  facets: Facet[];
  count = 0;
  kampagnen: Kampagne[];
  search_links: Array<any>[];
}

