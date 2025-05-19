import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
  ApiProperty,
} from '@nestjs/swagger';

class Paging {
  @ApiProperty()
  totalPage?: number;

  @ApiProperty()
  currentPage?: number;

  @ApiProperty()
  itemCount?: number;

  @ApiProperty()
  totalItems?: number;

  @ApiProperty()
  itemsPerPage?: number;

  @ApiProperty()
  totalPages?: number;
}

export function PaginatedResponse<TModel extends Type<any>>(model: TModel) {
  class DataClass {
    @ApiProperty({ type: [model] })
    data: TModel[];

    @ApiProperty({ type: Paging })
    paging: Paging;
  }

  class ResponseClass {
    @ApiProperty({ type: () => DataClass })
    data: DataClass;

    @ApiProperty()
    message: string;
  }

  return applyDecorators(
    ApiExtraModels(ResponseClass, DataClass, model, Paging),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(ResponseClass),
      },
    }),
  );
}
