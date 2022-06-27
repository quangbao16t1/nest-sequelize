
export const getPagingData = (data, page, limit) => {
    const totalItems = data.count;
    const matches = data.rows;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, matches, totalPages, currentPage };
}

export const paginate = (query, { page, pageSize }) => {
    const offset = page * pageSize;
    const limit = pageSize;
  
    return {
      ...query,
      offset,
      limit,
    };
  };