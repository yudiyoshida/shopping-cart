import { injectable } from 'inversify';

export interface IPaginationDto<T> {
  data: T[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

@injectable()
export class PaginationService {
  public execute<T>([rows, count]: [T[], number], page: number, size: number): IPaginationDto<T> {
    return {
      data: rows,
      currentPage: page,
      itemsPerPage: size,
      totalItems: count,
      totalPages: Math.ceil(count / size),
    };
  }
}
