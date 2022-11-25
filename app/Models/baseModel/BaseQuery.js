import { QueryBuilder } from 'objection';

class BaseQuery extends QueryBuilder{
    
    
      async genericQuery(req) {
        let page = req.query.currentPage-1,
            perPage = req.query.perPage

        if (isNaN(page)) {
          throw new Error('Paginate error: currentPage must be a number.');
        }
        if (isNaN(perPage)) {
          throw new Error('Paginate error: perPage must be a number.');
        }

        /**
         * apply pagination to the query builder
         */
        if(perPage && page) this.page(page,perPage)
    
        return this;
      }
      
      async paginate(currentPage,perPage){
        let paginator = {};
        let promises = [];
        let page = currentPage-1;

        if (isNaN(page)) {
          throw new Error('Paginate error: currentPage must be a number.');
        }
        if (isNaN(perPage)) {
          throw new Error('Paginate error: perPage must be a number.');
        }
        const offset = (page) * perPage;
        
    
        promises.push(this.clone().clearSelect().clearOrder().count('* as total').first());
        promises.push(this.offset(offset).limit(perPage));

        return Promise.all(promises).then(([countQuery, result]) => {
      
            const total = countQuery.total;
    
          // Add pagination data to paginator object
          paginator = {
            per_page: perPage,
            current_page: currentPage,
            last_page: Math.ceil(total / perPage),
            from: offset,
            to: offset + result.length,
            total: total,
            results: result
          }
    
          return paginator;
        });
        // return this.data;
      }

      async orderByCol(column,direction){
        if(column) {
          this.orderBy(column,direction||'asc')
          this.limit(10)
        }
        return this
      }
}

export default BaseQuery