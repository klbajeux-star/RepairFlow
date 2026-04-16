
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Quote
 * 
 */
export type Quote = $Result.DefaultSelection<Prisma.$QuotePayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model DeviceType
 * 
 */
export type DeviceType = $Result.DefaultSelection<Prisma.$DeviceTypePayload>
/**
 * Model DeviceBrand
 * 
 */
export type DeviceBrand = $Result.DefaultSelection<Prisma.$DeviceBrandPayload>
/**
 * Model DeviceModel
 * 
 */
export type DeviceModel = $Result.DefaultSelection<Prisma.$DeviceModelPayload>
/**
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Repair
 * 
 */
export type Repair = $Result.DefaultSelection<Prisma.$RepairPayload>
/**
 * Model RepairService
 * 
 */
export type RepairService = $Result.DefaultSelection<Prisma.$RepairServicePayload>
/**
 * Model RepairLog
 * 
 */
export type RepairLog = $Result.DefaultSelection<Prisma.$RepairLogPayload>
/**
 * Model ShopProduct
 * 
 */
export type ShopProduct = $Result.DefaultSelection<Prisma.$ShopProductPayload>
/**
 * Model WorkshopSettings
 * 
 */
export type WorkshopSettings = $Result.DefaultSelection<Prisma.$WorkshopSettingsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clients
 * const clients = await prisma.client.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs>;

  /**
   * `prisma.quote`: Exposes CRUD operations for the **Quote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quotes
    * const quotes = await prisma.quote.findMany()
    * ```
    */
  get quote(): Prisma.QuoteDelegate<ExtArgs>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs>;

  /**
   * `prisma.deviceType`: Exposes CRUD operations for the **DeviceType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceTypes
    * const deviceTypes = await prisma.deviceType.findMany()
    * ```
    */
  get deviceType(): Prisma.DeviceTypeDelegate<ExtArgs>;

  /**
   * `prisma.deviceBrand`: Exposes CRUD operations for the **DeviceBrand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceBrands
    * const deviceBrands = await prisma.deviceBrand.findMany()
    * ```
    */
  get deviceBrand(): Prisma.DeviceBrandDelegate<ExtArgs>;

  /**
   * `prisma.deviceModel`: Exposes CRUD operations for the **DeviceModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceModels
    * const deviceModels = await prisma.deviceModel.findMany()
    * ```
    */
  get deviceModel(): Prisma.DeviceModelDelegate<ExtArgs>;

  /**
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs>;

  /**
   * `prisma.repair`: Exposes CRUD operations for the **Repair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Repairs
    * const repairs = await prisma.repair.findMany()
    * ```
    */
  get repair(): Prisma.RepairDelegate<ExtArgs>;

  /**
   * `prisma.repairService`: Exposes CRUD operations for the **RepairService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepairServices
    * const repairServices = await prisma.repairService.findMany()
    * ```
    */
  get repairService(): Prisma.RepairServiceDelegate<ExtArgs>;

  /**
   * `prisma.repairLog`: Exposes CRUD operations for the **RepairLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepairLogs
    * const repairLogs = await prisma.repairLog.findMany()
    * ```
    */
  get repairLog(): Prisma.RepairLogDelegate<ExtArgs>;

  /**
   * `prisma.shopProduct`: Exposes CRUD operations for the **ShopProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopProducts
    * const shopProducts = await prisma.shopProduct.findMany()
    * ```
    */
  get shopProduct(): Prisma.ShopProductDelegate<ExtArgs>;

  /**
   * `prisma.workshopSettings`: Exposes CRUD operations for the **WorkshopSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkshopSettings
    * const workshopSettings = await prisma.workshopSettings.findMany()
    * ```
    */
  get workshopSettings(): Prisma.WorkshopSettingsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.11.0
   * Query Engine version: efd2449663b3d73d637ea1fd226bafbcf45b3102
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Client: 'Client',
    Quote: 'Quote',
    Invoice: 'Invoice',
    DeviceType: 'DeviceType',
    DeviceBrand: 'DeviceBrand',
    DeviceModel: 'DeviceModel',
    Part: 'Part',
    Service: 'Service',
    Repair: 'Repair',
    RepairService: 'RepairService',
    RepairLog: 'RepairLog',
    ShopProduct: 'ShopProduct',
    WorkshopSettings: 'WorkshopSettings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'client' | 'quote' | 'invoice' | 'deviceType' | 'deviceBrand' | 'deviceModel' | 'part' | 'service' | 'repair' | 'repairService' | 'repairLog' | 'shopProduct' | 'workshopSettings'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>,
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Quote: {
        payload: Prisma.$QuotePayload<ExtArgs>
        fields: Prisma.QuoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuoteFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuoteFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          findFirst: {
            args: Prisma.QuoteFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuoteFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          findMany: {
            args: Prisma.QuoteFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>[]
          }
          create: {
            args: Prisma.QuoteCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          delete: {
            args: Prisma.QuoteDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          update: {
            args: Prisma.QuoteUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          deleteMany: {
            args: Prisma.QuoteDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.QuoteUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.QuoteUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          aggregate: {
            args: Prisma.QuoteAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateQuote>
          }
          groupBy: {
            args: Prisma.QuoteGroupByArgs<ExtArgs>,
            result: $Utils.Optional<QuoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuoteCountArgs<ExtArgs>,
            result: $Utils.Optional<QuoteCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>,
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      DeviceType: {
        payload: Prisma.$DeviceTypePayload<ExtArgs>
        fields: Prisma.DeviceTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceTypeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceTypeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload>
          }
          findFirst: {
            args: Prisma.DeviceTypeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceTypeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload>
          }
          findMany: {
            args: Prisma.DeviceTypeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload>[]
          }
          create: {
            args: Prisma.DeviceTypeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload>
          }
          delete: {
            args: Prisma.DeviceTypeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload>
          }
          update: {
            args: Prisma.DeviceTypeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload>
          }
          deleteMany: {
            args: Prisma.DeviceTypeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceTypeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DeviceTypeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceTypePayload>
          }
          aggregate: {
            args: Prisma.DeviceTypeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDeviceType>
          }
          groupBy: {
            args: Prisma.DeviceTypeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DeviceTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceTypeCountArgs<ExtArgs>,
            result: $Utils.Optional<DeviceTypeCountAggregateOutputType> | number
          }
        }
      }
      DeviceBrand: {
        payload: Prisma.$DeviceBrandPayload<ExtArgs>
        fields: Prisma.DeviceBrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceBrandFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceBrandFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload>
          }
          findFirst: {
            args: Prisma.DeviceBrandFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceBrandFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload>
          }
          findMany: {
            args: Prisma.DeviceBrandFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload>[]
          }
          create: {
            args: Prisma.DeviceBrandCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload>
          }
          delete: {
            args: Prisma.DeviceBrandDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload>
          }
          update: {
            args: Prisma.DeviceBrandUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload>
          }
          deleteMany: {
            args: Prisma.DeviceBrandDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceBrandUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DeviceBrandUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceBrandPayload>
          }
          aggregate: {
            args: Prisma.DeviceBrandAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDeviceBrand>
          }
          groupBy: {
            args: Prisma.DeviceBrandGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DeviceBrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceBrandCountArgs<ExtArgs>,
            result: $Utils.Optional<DeviceBrandCountAggregateOutputType> | number
          }
        }
      }
      DeviceModel: {
        payload: Prisma.$DeviceModelPayload<ExtArgs>
        fields: Prisma.DeviceModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceModelFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceModelFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload>
          }
          findFirst: {
            args: Prisma.DeviceModelFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceModelFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload>
          }
          findMany: {
            args: Prisma.DeviceModelFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload>[]
          }
          create: {
            args: Prisma.DeviceModelCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload>
          }
          delete: {
            args: Prisma.DeviceModelDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload>
          }
          update: {
            args: Prisma.DeviceModelUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload>
          }
          deleteMany: {
            args: Prisma.DeviceModelDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceModelUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DeviceModelUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DeviceModelPayload>
          }
          aggregate: {
            args: Prisma.DeviceModelAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDeviceModel>
          }
          groupBy: {
            args: Prisma.DeviceModelGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DeviceModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceModelCountArgs<ExtArgs>,
            result: $Utils.Optional<DeviceModelCountAggregateOutputType> | number
          }
        }
      }
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>,
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>,
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Repair: {
        payload: Prisma.$RepairPayload<ExtArgs>
        fields: Prisma.RepairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          findFirst: {
            args: Prisma.RepairFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          findMany: {
            args: Prisma.RepairFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>[]
          }
          create: {
            args: Prisma.RepairCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          delete: {
            args: Prisma.RepairDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          update: {
            args: Prisma.RepairUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          deleteMany: {
            args: Prisma.RepairDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RepairUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RepairUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairPayload>
          }
          aggregate: {
            args: Prisma.RepairAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRepair>
          }
          groupBy: {
            args: Prisma.RepairGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RepairGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairCountArgs<ExtArgs>,
            result: $Utils.Optional<RepairCountAggregateOutputType> | number
          }
        }
      }
      RepairService: {
        payload: Prisma.$RepairServicePayload<ExtArgs>
        fields: Prisma.RepairServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairServiceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairServiceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload>
          }
          findFirst: {
            args: Prisma.RepairServiceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairServiceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload>
          }
          findMany: {
            args: Prisma.RepairServiceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload>[]
          }
          create: {
            args: Prisma.RepairServiceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload>
          }
          delete: {
            args: Prisma.RepairServiceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload>
          }
          update: {
            args: Prisma.RepairServiceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload>
          }
          deleteMany: {
            args: Prisma.RepairServiceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RepairServiceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RepairServiceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairServicePayload>
          }
          aggregate: {
            args: Prisma.RepairServiceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRepairService>
          }
          groupBy: {
            args: Prisma.RepairServiceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RepairServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairServiceCountArgs<ExtArgs>,
            result: $Utils.Optional<RepairServiceCountAggregateOutputType> | number
          }
        }
      }
      RepairLog: {
        payload: Prisma.$RepairLogPayload<ExtArgs>
        fields: Prisma.RepairLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairLogFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairLogFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload>
          }
          findFirst: {
            args: Prisma.RepairLogFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairLogFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload>
          }
          findMany: {
            args: Prisma.RepairLogFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload>[]
          }
          create: {
            args: Prisma.RepairLogCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload>
          }
          delete: {
            args: Prisma.RepairLogDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload>
          }
          update: {
            args: Prisma.RepairLogUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload>
          }
          deleteMany: {
            args: Prisma.RepairLogDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RepairLogUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RepairLogUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RepairLogPayload>
          }
          aggregate: {
            args: Prisma.RepairLogAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRepairLog>
          }
          groupBy: {
            args: Prisma.RepairLogGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RepairLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairLogCountArgs<ExtArgs>,
            result: $Utils.Optional<RepairLogCountAggregateOutputType> | number
          }
        }
      }
      ShopProduct: {
        payload: Prisma.$ShopProductPayload<ExtArgs>
        fields: Prisma.ShopProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopProductFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopProductFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload>
          }
          findFirst: {
            args: Prisma.ShopProductFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopProductFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload>
          }
          findMany: {
            args: Prisma.ShopProductFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload>[]
          }
          create: {
            args: Prisma.ShopProductCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload>
          }
          delete: {
            args: Prisma.ShopProductDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload>
          }
          update: {
            args: Prisma.ShopProductUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload>
          }
          deleteMany: {
            args: Prisma.ShopProductDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ShopProductUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ShopProductUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ShopProductPayload>
          }
          aggregate: {
            args: Prisma.ShopProductAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateShopProduct>
          }
          groupBy: {
            args: Prisma.ShopProductGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ShopProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopProductCountArgs<ExtArgs>,
            result: $Utils.Optional<ShopProductCountAggregateOutputType> | number
          }
        }
      }
      WorkshopSettings: {
        payload: Prisma.$WorkshopSettingsPayload<ExtArgs>
        fields: Prisma.WorkshopSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkshopSettingsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkshopSettingsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload>
          }
          findFirst: {
            args: Prisma.WorkshopSettingsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkshopSettingsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload>
          }
          findMany: {
            args: Prisma.WorkshopSettingsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload>[]
          }
          create: {
            args: Prisma.WorkshopSettingsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload>
          }
          delete: {
            args: Prisma.WorkshopSettingsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload>
          }
          update: {
            args: Prisma.WorkshopSettingsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload>
          }
          deleteMany: {
            args: Prisma.WorkshopSettingsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.WorkshopSettingsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.WorkshopSettingsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkshopSettingsPayload>
          }
          aggregate: {
            args: Prisma.WorkshopSettingsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWorkshopSettings>
          }
          groupBy: {
            args: Prisma.WorkshopSettingsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<WorkshopSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkshopSettingsCountArgs<ExtArgs>,
            result: $Utils.Optional<WorkshopSettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    invoices: number
    quotes: number
    repairs: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | ClientCountOutputTypeCountInvoicesArgs
    quotes?: boolean | ClientCountOutputTypeCountQuotesArgs
    repairs?: boolean | ClientCountOutputTypeCountRepairsArgs
  }

  // Custom InputTypes

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }


  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountQuotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteWhereInput
  }


  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairWhereInput
  }



  /**
   * Count Type DeviceTypeCountOutputType
   */

  export type DeviceTypeCountOutputType = {
    models: number
  }

  export type DeviceTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | DeviceTypeCountOutputTypeCountModelsArgs
  }

  // Custom InputTypes

  /**
   * DeviceTypeCountOutputType without action
   */
  export type DeviceTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceTypeCountOutputType
     */
    select?: DeviceTypeCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * DeviceTypeCountOutputType without action
   */
  export type DeviceTypeCountOutputTypeCountModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceModelWhereInput
  }



  /**
   * Count Type DeviceBrandCountOutputType
   */

  export type DeviceBrandCountOutputType = {
    models: number
  }

  export type DeviceBrandCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | DeviceBrandCountOutputTypeCountModelsArgs
  }

  // Custom InputTypes

  /**
   * DeviceBrandCountOutputType without action
   */
  export type DeviceBrandCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrandCountOutputType
     */
    select?: DeviceBrandCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * DeviceBrandCountOutputType without action
   */
  export type DeviceBrandCountOutputTypeCountModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceModelWhereInput
  }



  /**
   * Count Type DeviceModelCountOutputType
   */

  export type DeviceModelCountOutputType = {
    parts: number
    services: number
  }

  export type DeviceModelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | DeviceModelCountOutputTypeCountPartsArgs
    services?: boolean | DeviceModelCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes

  /**
   * DeviceModelCountOutputType without action
   */
  export type DeviceModelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModelCountOutputType
     */
    select?: DeviceModelCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * DeviceModelCountOutputType without action
   */
  export type DeviceModelCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
  }


  /**
   * DeviceModelCountOutputType without action
   */
  export type DeviceModelCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }



  /**
   * Count Type PartCountOutputType
   */

  export type PartCountOutputType = {
    services: number
  }

  export type PartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | PartCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCountOutputType
     */
    select?: PartCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }



  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    repairs: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairs?: boolean | ServiceCountOutputTypeCountRepairsArgs
  }

  // Custom InputTypes

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairServiceWhereInput
  }



  /**
   * Count Type RepairCountOutputType
   */

  export type RepairCountOutputType = {
    invoices: number
    quotes: number
    logs: number
    services: number
  }

  export type RepairCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | RepairCountOutputTypeCountInvoicesArgs
    quotes?: boolean | RepairCountOutputTypeCountQuotesArgs
    logs?: boolean | RepairCountOutputTypeCountLogsArgs
    services?: boolean | RepairCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes

  /**
   * RepairCountOutputType without action
   */
  export type RepairCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairCountOutputType
     */
    select?: RepairCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * RepairCountOutputType without action
   */
  export type RepairCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }


  /**
   * RepairCountOutputType without action
   */
  export type RepairCountOutputTypeCountQuotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteWhereInput
  }


  /**
   * RepairCountOutputType without action
   */
  export type RepairCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairLogWhereInput
  }


  /**
   * RepairCountOutputType without action
   */
  export type RepairCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairServiceWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    name: string | null
    firstName: string | null
    lastName: string | null
    clientType: string | null
    email: string | null
    phone: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    createdAt: Date | null
    siret: string | null
    vatNumber: string | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    firstName: string | null
    lastName: string | null
    clientType: string | null
    email: string | null
    phone: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    createdAt: Date | null
    siret: string | null
    vatNumber: string | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    firstName: number
    lastName: number
    clientType: number
    email: number
    phone: number
    address: number
    zipCode: number
    city: number
    createdAt: number
    siret: number
    vatNumber: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    firstName?: true
    lastName?: true
    clientType?: true
    email?: true
    phone?: true
    address?: true
    zipCode?: true
    city?: true
    createdAt?: true
    siret?: true
    vatNumber?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    firstName?: true
    lastName?: true
    clientType?: true
    email?: true
    phone?: true
    address?: true
    zipCode?: true
    city?: true
    createdAt?: true
    siret?: true
    vatNumber?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    firstName?: true
    lastName?: true
    clientType?: true
    email?: true
    phone?: true
    address?: true
    zipCode?: true
    city?: true
    createdAt?: true
    siret?: true
    vatNumber?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    name: string
    firstName: string | null
    lastName: string | null
    clientType: string
    email: string | null
    phone: string
    address: string | null
    zipCode: string | null
    city: string | null
    createdAt: Date
    siret: string | null
    vatNumber: string | null
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    firstName?: boolean
    lastName?: boolean
    clientType?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    zipCode?: boolean
    city?: boolean
    createdAt?: boolean
    siret?: boolean
    vatNumber?: boolean
    invoices?: boolean | Client$invoicesArgs<ExtArgs>
    quotes?: boolean | Client$quotesArgs<ExtArgs>
    repairs?: boolean | Client$repairsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    firstName?: boolean
    lastName?: boolean
    clientType?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    zipCode?: boolean
    city?: boolean
    createdAt?: boolean
    siret?: boolean
    vatNumber?: boolean
  }

  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | Client$invoicesArgs<ExtArgs>
    quotes?: boolean | Client$quotesArgs<ExtArgs>
    repairs?: boolean | Client$repairsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      quotes: Prisma.$QuotePayload<ExtArgs>[]
      repairs: Prisma.$RepairPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      firstName: string | null
      lastName: string | null
      clientType: string
      email: string | null
      phone: string
      address: string | null
      zipCode: string | null
      city: string | null
      createdAt: Date
      siret: string | null
      vatNumber: string | null
    }, ExtArgs["result"]["client"]>
    composites: {}
  }


  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ClientFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Client that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ClientFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ClientFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
    **/
    create<T extends ClientCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ClientCreateArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
    **/
    delete<T extends ClientDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ClientUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ClientDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ClientUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
    **/
    upsert<T extends ClientUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>
    ): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    invoices<T extends Client$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Client$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findMany'> | Null>;

    quotes<T extends Client$quotesArgs<ExtArgs> = {}>(args?: Subset<T, Client$quotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findMany'> | Null>;

    repairs<T extends Client$repairsArgs<ExtArgs> = {}>(args?: Subset<T, Client$repairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Client model
   */ 
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly firstName: FieldRef<"Client", 'String'>
    readonly lastName: FieldRef<"Client", 'String'>
    readonly clientType: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly phone: FieldRef<"Client", 'String'>
    readonly address: FieldRef<"Client", 'String'>
    readonly zipCode: FieldRef<"Client", 'String'>
    readonly city: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly siret: FieldRef<"Client", 'String'>
    readonly vatNumber: FieldRef<"Client", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }


  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }


  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }


  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }


  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }


  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }


  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }


  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
  }


  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }


  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }


  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
  }


  /**
   * Client.invoices
   */
  export type Client$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }


  /**
   * Client.quotes
   */
  export type Client$quotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    where?: QuoteWhereInput
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    cursor?: QuoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }


  /**
   * Client.repairs
   */
  export type Client$repairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    where?: RepairWhereInput
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    cursor?: RepairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }


  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClientInclude<ExtArgs> | null
  }



  /**
   * Model Quote
   */

  export type AggregateQuote = {
    _count: QuoteCountAggregateOutputType | null
    _avg: QuoteAvgAggregateOutputType | null
    _sum: QuoteSumAggregateOutputType | null
    _min: QuoteMinAggregateOutputType | null
    _max: QuoteMaxAggregateOutputType | null
  }

  export type QuoteAvgAggregateOutputType = {
    totalHT: number | null
    totalTTC: number | null
  }

  export type QuoteSumAggregateOutputType = {
    totalHT: number | null
    totalTTC: number | null
  }

  export type QuoteMinAggregateOutputType = {
    id: string | null
    number: string | null
    status: string | null
    clientId: string | null
    repairId: string | null
    items: string | null
    totalHT: number | null
    totalTTC: number | null
    notes: string | null
    validUntil: Date | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    taxDetails: string | null
  }

  export type QuoteMaxAggregateOutputType = {
    id: string | null
    number: string | null
    status: string | null
    clientId: string | null
    repairId: string | null
    items: string | null
    totalHT: number | null
    totalTTC: number | null
    notes: string | null
    validUntil: Date | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    taxDetails: string | null
  }

  export type QuoteCountAggregateOutputType = {
    id: number
    number: number
    status: number
    clientId: number
    repairId: number
    items: number
    totalHT: number
    totalTTC: number
    notes: number
    validUntil: number
    invoiceId: number
    createdAt: number
    updatedAt: number
    taxDetails: number
    _all: number
  }


  export type QuoteAvgAggregateInputType = {
    totalHT?: true
    totalTTC?: true
  }

  export type QuoteSumAggregateInputType = {
    totalHT?: true
    totalTTC?: true
  }

  export type QuoteMinAggregateInputType = {
    id?: true
    number?: true
    status?: true
    clientId?: true
    repairId?: true
    items?: true
    totalHT?: true
    totalTTC?: true
    notes?: true
    validUntil?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
    taxDetails?: true
  }

  export type QuoteMaxAggregateInputType = {
    id?: true
    number?: true
    status?: true
    clientId?: true
    repairId?: true
    items?: true
    totalHT?: true
    totalTTC?: true
    notes?: true
    validUntil?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
    taxDetails?: true
  }

  export type QuoteCountAggregateInputType = {
    id?: true
    number?: true
    status?: true
    clientId?: true
    repairId?: true
    items?: true
    totalHT?: true
    totalTTC?: true
    notes?: true
    validUntil?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
    taxDetails?: true
    _all?: true
  }

  export type QuoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quote to aggregate.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quotes
    **/
    _count?: true | QuoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuoteMaxAggregateInputType
  }

  export type GetQuoteAggregateType<T extends QuoteAggregateArgs> = {
        [P in keyof T & keyof AggregateQuote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuote[P]>
      : GetScalarType<T[P], AggregateQuote[P]>
  }




  export type QuoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteWhereInput
    orderBy?: QuoteOrderByWithAggregationInput | QuoteOrderByWithAggregationInput[]
    by: QuoteScalarFieldEnum[] | QuoteScalarFieldEnum
    having?: QuoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuoteCountAggregateInputType | true
    _avg?: QuoteAvgAggregateInputType
    _sum?: QuoteSumAggregateInputType
    _min?: QuoteMinAggregateInputType
    _max?: QuoteMaxAggregateInputType
  }

  export type QuoteGroupByOutputType = {
    id: string
    number: string
    status: string
    clientId: string
    repairId: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes: string | null
    validUntil: Date | null
    invoiceId: string | null
    createdAt: Date
    updatedAt: Date
    taxDetails: string | null
    _count: QuoteCountAggregateOutputType | null
    _avg: QuoteAvgAggregateOutputType | null
    _sum: QuoteSumAggregateOutputType | null
    _min: QuoteMinAggregateOutputType | null
    _max: QuoteMaxAggregateOutputType | null
  }

  type GetQuoteGroupByPayload<T extends QuoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuoteGroupByOutputType[P]>
            : GetScalarType<T[P], QuoteGroupByOutputType[P]>
        }
      >
    >


  export type QuoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    status?: boolean
    clientId?: boolean
    repairId?: boolean
    items?: boolean
    totalHT?: boolean
    totalTTC?: boolean
    notes?: boolean
    validUntil?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    taxDetails?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    repair?: boolean | Quote$repairArgs<ExtArgs>
    invoice?: boolean | Quote$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["quote"]>

  export type QuoteSelectScalar = {
    id?: boolean
    number?: boolean
    status?: boolean
    clientId?: boolean
    repairId?: boolean
    items?: boolean
    totalHT?: boolean
    totalTTC?: boolean
    notes?: boolean
    validUntil?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    taxDetails?: boolean
  }

  export type QuoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    repair?: boolean | Quote$repairArgs<ExtArgs>
    invoice?: boolean | Quote$invoiceArgs<ExtArgs>
  }


  export type $QuotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quote"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      repair: Prisma.$RepairPayload<ExtArgs> | null
      invoice: Prisma.$InvoicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: string
      status: string
      clientId: string
      repairId: string | null
      items: string
      totalHT: number
      totalTTC: number
      notes: string | null
      validUntil: Date | null
      invoiceId: string | null
      createdAt: Date
      updatedAt: Date
      taxDetails: string | null
    }, ExtArgs["result"]["quote"]>
    composites: {}
  }


  type QuoteGetPayload<S extends boolean | null | undefined | QuoteDefaultArgs> = $Result.GetResult<Prisma.$QuotePayload, S>

  type QuoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuoteCountAggregateInputType | true
    }

  export interface QuoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quote'], meta: { name: 'Quote' } }
    /**
     * Find zero or one Quote that matches the filter.
     * @param {QuoteFindUniqueArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends QuoteFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, QuoteFindUniqueArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Quote that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {QuoteFindUniqueOrThrowArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends QuoteFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, QuoteFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Quote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindFirstArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends QuoteFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, QuoteFindFirstArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Quote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindFirstOrThrowArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends QuoteFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, QuoteFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Quotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quotes
     * const quotes = await prisma.quote.findMany()
     * 
     * // Get first 10 Quotes
     * const quotes = await prisma.quote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quoteWithIdOnly = await prisma.quote.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends QuoteFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, QuoteFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Quote.
     * @param {QuoteCreateArgs} args - Arguments to create a Quote.
     * @example
     * // Create one Quote
     * const Quote = await prisma.quote.create({
     *   data: {
     *     // ... data to create a Quote
     *   }
     * })
     * 
    **/
    create<T extends QuoteCreateArgs<ExtArgs>>(
      args: SelectSubset<T, QuoteCreateArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Quote.
     * @param {QuoteDeleteArgs} args - Arguments to delete one Quote.
     * @example
     * // Delete one Quote
     * const Quote = await prisma.quote.delete({
     *   where: {
     *     // ... filter to delete one Quote
     *   }
     * })
     * 
    **/
    delete<T extends QuoteDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, QuoteDeleteArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Quote.
     * @param {QuoteUpdateArgs} args - Arguments to update one Quote.
     * @example
     * // Update one Quote
     * const quote = await prisma.quote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends QuoteUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, QuoteUpdateArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Quotes.
     * @param {QuoteDeleteManyArgs} args - Arguments to filter Quotes to delete.
     * @example
     * // Delete a few Quotes
     * const { count } = await prisma.quote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends QuoteDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, QuoteDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quotes
     * const quote = await prisma.quote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends QuoteUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, QuoteUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Quote.
     * @param {QuoteUpsertArgs} args - Arguments to update or create a Quote.
     * @example
     * // Update or create a Quote
     * const quote = await prisma.quote.upsert({
     *   create: {
     *     // ... data to create a Quote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quote we want to update
     *   }
     * })
    **/
    upsert<T extends QuoteUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, QuoteUpsertArgs<ExtArgs>>
    ): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Quotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteCountArgs} args - Arguments to filter Quotes to count.
     * @example
     * // Count the number of Quotes
     * const count = await prisma.quote.count({
     *   where: {
     *     // ... the filter for the Quotes we want to count
     *   }
     * })
    **/
    count<T extends QuoteCountArgs>(
      args?: Subset<T, QuoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuoteAggregateArgs>(args: Subset<T, QuoteAggregateArgs>): Prisma.PrismaPromise<GetQuoteAggregateType<T>>

    /**
     * Group by Quote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuoteGroupByArgs['orderBy'] }
        : { orderBy?: QuoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quote model
   */
  readonly fields: QuoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    repair<T extends Quote$repairArgs<ExtArgs> = {}>(args?: Subset<T, Quote$repairArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    invoice<T extends Quote$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, Quote$invoiceArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Quote model
   */ 
  interface QuoteFieldRefs {
    readonly id: FieldRef<"Quote", 'String'>
    readonly number: FieldRef<"Quote", 'String'>
    readonly status: FieldRef<"Quote", 'String'>
    readonly clientId: FieldRef<"Quote", 'String'>
    readonly repairId: FieldRef<"Quote", 'String'>
    readonly items: FieldRef<"Quote", 'String'>
    readonly totalHT: FieldRef<"Quote", 'Float'>
    readonly totalTTC: FieldRef<"Quote", 'Float'>
    readonly notes: FieldRef<"Quote", 'String'>
    readonly validUntil: FieldRef<"Quote", 'DateTime'>
    readonly invoiceId: FieldRef<"Quote", 'String'>
    readonly createdAt: FieldRef<"Quote", 'DateTime'>
    readonly updatedAt: FieldRef<"Quote", 'DateTime'>
    readonly taxDetails: FieldRef<"Quote", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Quote findUnique
   */
  export type QuoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where: QuoteWhereUniqueInput
  }


  /**
   * Quote findUniqueOrThrow
   */
  export type QuoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where: QuoteWhereUniqueInput
  }


  /**
   * Quote findFirst
   */
  export type QuoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }


  /**
   * Quote findFirstOrThrow
   */
  export type QuoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }


  /**
   * Quote findMany
   */
  export type QuoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quotes to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }


  /**
   * Quote create
   */
  export type QuoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Quote.
     */
    data: XOR<QuoteCreateInput, QuoteUncheckedCreateInput>
  }


  /**
   * Quote update
   */
  export type QuoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Quote.
     */
    data: XOR<QuoteUpdateInput, QuoteUncheckedUpdateInput>
    /**
     * Choose, which Quote to update.
     */
    where: QuoteWhereUniqueInput
  }


  /**
   * Quote updateMany
   */
  export type QuoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quotes.
     */
    data: XOR<QuoteUpdateManyMutationInput, QuoteUncheckedUpdateManyInput>
    /**
     * Filter which Quotes to update
     */
    where?: QuoteWhereInput
  }


  /**
   * Quote upsert
   */
  export type QuoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Quote to update in case it exists.
     */
    where: QuoteWhereUniqueInput
    /**
     * In case the Quote found by the `where` argument doesn't exist, create a new Quote with this data.
     */
    create: XOR<QuoteCreateInput, QuoteUncheckedCreateInput>
    /**
     * In case the Quote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuoteUpdateInput, QuoteUncheckedUpdateInput>
  }


  /**
   * Quote delete
   */
  export type QuoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter which Quote to delete.
     */
    where: QuoteWhereUniqueInput
  }


  /**
   * Quote deleteMany
   */
  export type QuoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotes to delete
     */
    where?: QuoteWhereInput
  }


  /**
   * Quote.repair
   */
  export type Quote$repairArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    where?: RepairWhereInput
  }


  /**
   * Quote.invoice
   */
  export type Quote$invoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
  }


  /**
   * Quote without action
   */
  export type QuoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
  }



  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    totalHT: number | null
    totalTTC: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    totalHT: number | null
    totalTTC: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    number: string | null
    clientId: string | null
    repairId: string | null
    items: string | null
    totalHT: number | null
    totalTTC: number | null
    notes: string | null
    paid: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    taxDetails: string | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    number: string | null
    clientId: string | null
    repairId: string | null
    items: string | null
    totalHT: number | null
    totalTTC: number | null
    notes: string | null
    paid: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    taxDetails: string | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    number: number
    clientId: number
    repairId: number
    items: number
    totalHT: number
    totalTTC: number
    notes: number
    paid: number
    createdAt: number
    updatedAt: number
    taxDetails: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    totalHT?: true
    totalTTC?: true
  }

  export type InvoiceSumAggregateInputType = {
    totalHT?: true
    totalTTC?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    number?: true
    clientId?: true
    repairId?: true
    items?: true
    totalHT?: true
    totalTTC?: true
    notes?: true
    paid?: true
    createdAt?: true
    updatedAt?: true
    taxDetails?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    number?: true
    clientId?: true
    repairId?: true
    items?: true
    totalHT?: true
    totalTTC?: true
    notes?: true
    paid?: true
    createdAt?: true
    updatedAt?: true
    taxDetails?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    number?: true
    clientId?: true
    repairId?: true
    items?: true
    totalHT?: true
    totalTTC?: true
    notes?: true
    paid?: true
    createdAt?: true
    updatedAt?: true
    taxDetails?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    number: string
    clientId: string
    repairId: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes: string | null
    paid: boolean
    createdAt: Date
    updatedAt: Date
    taxDetails: string | null
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    clientId?: boolean
    repairId?: boolean
    items?: boolean
    totalHT?: boolean
    totalTTC?: boolean
    notes?: boolean
    paid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    taxDetails?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    repair?: boolean | Invoice$repairArgs<ExtArgs>
    quote?: boolean | Invoice$quoteArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    number?: boolean
    clientId?: boolean
    repairId?: boolean
    items?: boolean
    totalHT?: boolean
    totalTTC?: boolean
    notes?: boolean
    paid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    taxDetails?: boolean
  }

  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    repair?: boolean | Invoice$repairArgs<ExtArgs>
    quote?: boolean | Invoice$quoteArgs<ExtArgs>
  }


  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      repair: Prisma.$RepairPayload<ExtArgs> | null
      quote: Prisma.$QuotePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: string
      clientId: string
      repairId: string | null
      items: string
      totalHT: number
      totalTTC: number
      notes: string | null
      paid: boolean
      createdAt: Date
      updatedAt: Date
      taxDetails: string | null
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }


  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InvoiceFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Invoice that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InvoiceFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InvoiceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
    **/
    create<T extends InvoiceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
    **/
    delete<T extends InvoiceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InvoiceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InvoiceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InvoiceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
    **/
    upsert<T extends InvoiceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>
    ): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    repair<T extends Invoice$repairArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$repairArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    quote<T extends Invoice$quoteArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$quoteArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Invoice model
   */ 
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly number: FieldRef<"Invoice", 'String'>
    readonly clientId: FieldRef<"Invoice", 'String'>
    readonly repairId: FieldRef<"Invoice", 'String'>
    readonly items: FieldRef<"Invoice", 'String'>
    readonly totalHT: FieldRef<"Invoice", 'Float'>
    readonly totalTTC: FieldRef<"Invoice", 'Float'>
    readonly notes: FieldRef<"Invoice", 'String'>
    readonly paid: FieldRef<"Invoice", 'Boolean'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
    readonly taxDetails: FieldRef<"Invoice", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }


  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }


  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }


  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }


  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }


  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }


  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }


  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
  }


  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }


  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }


  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
  }


  /**
   * Invoice.repair
   */
  export type Invoice$repairArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    where?: RepairWhereInput
  }


  /**
   * Invoice.quote
   */
  export type Invoice$quoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    where?: QuoteWhereInput
  }


  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
  }



  /**
   * Model DeviceType
   */

  export type AggregateDeviceType = {
    _count: DeviceTypeCountAggregateOutputType | null
    _min: DeviceTypeMinAggregateOutputType | null
    _max: DeviceTypeMaxAggregateOutputType | null
  }

  export type DeviceTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DeviceTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DeviceTypeCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type DeviceTypeMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type DeviceTypeMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type DeviceTypeCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type DeviceTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceType to aggregate.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: DeviceTypeOrderByWithRelationInput | DeviceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceTypes
    **/
    _count?: true | DeviceTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceTypeMaxAggregateInputType
  }

  export type GetDeviceTypeAggregateType<T extends DeviceTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceType[P]>
      : GetScalarType<T[P], AggregateDeviceType[P]>
  }




  export type DeviceTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceTypeWhereInput
    orderBy?: DeviceTypeOrderByWithAggregationInput | DeviceTypeOrderByWithAggregationInput[]
    by: DeviceTypeScalarFieldEnum[] | DeviceTypeScalarFieldEnum
    having?: DeviceTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceTypeCountAggregateInputType | true
    _min?: DeviceTypeMinAggregateInputType
    _max?: DeviceTypeMaxAggregateInputType
  }

  export type DeviceTypeGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: DeviceTypeCountAggregateOutputType | null
    _min: DeviceTypeMinAggregateOutputType | null
    _max: DeviceTypeMaxAggregateOutputType | null
  }

  type GetDeviceTypeGroupByPayload<T extends DeviceTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceTypeGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceTypeGroupByOutputType[P]>
        }
      >
    >


  export type DeviceTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    models?: boolean | DeviceType$modelsArgs<ExtArgs>
    _count?: boolean | DeviceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceType"]>

  export type DeviceTypeSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type DeviceTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | DeviceType$modelsArgs<ExtArgs>
    _count?: boolean | DeviceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $DeviceTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeviceType"
    objects: {
      models: Prisma.$DeviceModelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["deviceType"]>
    composites: {}
  }


  type DeviceTypeGetPayload<S extends boolean | null | undefined | DeviceTypeDefaultArgs> = $Result.GetResult<Prisma.$DeviceTypePayload, S>

  type DeviceTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeviceTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeviceTypeCountAggregateInputType | true
    }

  export interface DeviceTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeviceType'], meta: { name: 'DeviceType' } }
    /**
     * Find zero or one DeviceType that matches the filter.
     * @param {DeviceTypeFindUniqueArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DeviceTypeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceTypeFindUniqueArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one DeviceType that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DeviceTypeFindUniqueOrThrowArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DeviceTypeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceTypeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first DeviceType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeFindFirstArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DeviceTypeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceTypeFindFirstArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first DeviceType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeFindFirstOrThrowArgs} args - Arguments to find a DeviceType
     * @example
     * // Get one DeviceType
     * const deviceType = await prisma.deviceType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DeviceTypeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceTypeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more DeviceTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceTypes
     * const deviceTypes = await prisma.deviceType.findMany()
     * 
     * // Get first 10 DeviceTypes
     * const deviceTypes = await prisma.deviceType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceTypeWithIdOnly = await prisma.deviceType.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DeviceTypeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceTypeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a DeviceType.
     * @param {DeviceTypeCreateArgs} args - Arguments to create a DeviceType.
     * @example
     * // Create one DeviceType
     * const DeviceType = await prisma.deviceType.create({
     *   data: {
     *     // ... data to create a DeviceType
     *   }
     * })
     * 
    **/
    create<T extends DeviceTypeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceTypeCreateArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a DeviceType.
     * @param {DeviceTypeDeleteArgs} args - Arguments to delete one DeviceType.
     * @example
     * // Delete one DeviceType
     * const DeviceType = await prisma.deviceType.delete({
     *   where: {
     *     // ... filter to delete one DeviceType
     *   }
     * })
     * 
    **/
    delete<T extends DeviceTypeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceTypeDeleteArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one DeviceType.
     * @param {DeviceTypeUpdateArgs} args - Arguments to update one DeviceType.
     * @example
     * // Update one DeviceType
     * const deviceType = await prisma.deviceType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DeviceTypeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceTypeUpdateArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more DeviceTypes.
     * @param {DeviceTypeDeleteManyArgs} args - Arguments to filter DeviceTypes to delete.
     * @example
     * // Delete a few DeviceTypes
     * const { count } = await prisma.deviceType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DeviceTypeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceTypeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceTypes
     * const deviceType = await prisma.deviceType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DeviceTypeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceTypeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeviceType.
     * @param {DeviceTypeUpsertArgs} args - Arguments to update or create a DeviceType.
     * @example
     * // Update or create a DeviceType
     * const deviceType = await prisma.deviceType.upsert({
     *   create: {
     *     // ... data to create a DeviceType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceType we want to update
     *   }
     * })
    **/
    upsert<T extends DeviceTypeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceTypeUpsertArgs<ExtArgs>>
    ): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of DeviceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeCountArgs} args - Arguments to filter DeviceTypes to count.
     * @example
     * // Count the number of DeviceTypes
     * const count = await prisma.deviceType.count({
     *   where: {
     *     // ... the filter for the DeviceTypes we want to count
     *   }
     * })
    **/
    count<T extends DeviceTypeCountArgs>(
      args?: Subset<T, DeviceTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceTypeAggregateArgs>(args: Subset<T, DeviceTypeAggregateArgs>): Prisma.PrismaPromise<GetDeviceTypeAggregateType<T>>

    /**
     * Group by DeviceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceTypeGroupByArgs['orderBy'] }
        : { orderBy?: DeviceTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeviceType model
   */
  readonly fields: DeviceTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    models<T extends DeviceType$modelsArgs<ExtArgs> = {}>(args?: Subset<T, DeviceType$modelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the DeviceType model
   */ 
  interface DeviceTypeFieldRefs {
    readonly id: FieldRef<"DeviceType", 'String'>
    readonly name: FieldRef<"DeviceType", 'String'>
    readonly createdAt: FieldRef<"DeviceType", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * DeviceType findUnique
   */
  export type DeviceTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where: DeviceTypeWhereUniqueInput
  }


  /**
   * DeviceType findUniqueOrThrow
   */
  export type DeviceTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where: DeviceTypeWhereUniqueInput
  }


  /**
   * DeviceType findFirst
   */
  export type DeviceTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: DeviceTypeOrderByWithRelationInput | DeviceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceTypes.
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceTypes.
     */
    distinct?: DeviceTypeScalarFieldEnum | DeviceTypeScalarFieldEnum[]
  }


  /**
   * DeviceType findFirstOrThrow
   */
  export type DeviceTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * Filter, which DeviceType to fetch.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: DeviceTypeOrderByWithRelationInput | DeviceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceTypes.
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceTypes.
     */
    distinct?: DeviceTypeScalarFieldEnum | DeviceTypeScalarFieldEnum[]
  }


  /**
   * DeviceType findMany
   */
  export type DeviceTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * Filter, which DeviceTypes to fetch.
     */
    where?: DeviceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTypes to fetch.
     */
    orderBy?: DeviceTypeOrderByWithRelationInput | DeviceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceTypes.
     */
    cursor?: DeviceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTypes.
     */
    skip?: number
    distinct?: DeviceTypeScalarFieldEnum | DeviceTypeScalarFieldEnum[]
  }


  /**
   * DeviceType create
   */
  export type DeviceTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a DeviceType.
     */
    data: XOR<DeviceTypeCreateInput, DeviceTypeUncheckedCreateInput>
  }


  /**
   * DeviceType update
   */
  export type DeviceTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a DeviceType.
     */
    data: XOR<DeviceTypeUpdateInput, DeviceTypeUncheckedUpdateInput>
    /**
     * Choose, which DeviceType to update.
     */
    where: DeviceTypeWhereUniqueInput
  }


  /**
   * DeviceType updateMany
   */
  export type DeviceTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceTypes.
     */
    data: XOR<DeviceTypeUpdateManyMutationInput, DeviceTypeUncheckedUpdateManyInput>
    /**
     * Filter which DeviceTypes to update
     */
    where?: DeviceTypeWhereInput
  }


  /**
   * DeviceType upsert
   */
  export type DeviceTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the DeviceType to update in case it exists.
     */
    where: DeviceTypeWhereUniqueInput
    /**
     * In case the DeviceType found by the `where` argument doesn't exist, create a new DeviceType with this data.
     */
    create: XOR<DeviceTypeCreateInput, DeviceTypeUncheckedCreateInput>
    /**
     * In case the DeviceType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceTypeUpdateInput, DeviceTypeUncheckedUpdateInput>
  }


  /**
   * DeviceType delete
   */
  export type DeviceTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
    /**
     * Filter which DeviceType to delete.
     */
    where: DeviceTypeWhereUniqueInput
  }


  /**
   * DeviceType deleteMany
   */
  export type DeviceTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceTypes to delete
     */
    where?: DeviceTypeWhereInput
  }


  /**
   * DeviceType.models
   */
  export type DeviceType$modelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    where?: DeviceModelWhereInput
    orderBy?: DeviceModelOrderByWithRelationInput | DeviceModelOrderByWithRelationInput[]
    cursor?: DeviceModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceModelScalarFieldEnum | DeviceModelScalarFieldEnum[]
  }


  /**
   * DeviceType without action
   */
  export type DeviceTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceType
     */
    select?: DeviceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceTypeInclude<ExtArgs> | null
  }



  /**
   * Model DeviceBrand
   */

  export type AggregateDeviceBrand = {
    _count: DeviceBrandCountAggregateOutputType | null
    _min: DeviceBrandMinAggregateOutputType | null
    _max: DeviceBrandMaxAggregateOutputType | null
  }

  export type DeviceBrandMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DeviceBrandMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DeviceBrandCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type DeviceBrandMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type DeviceBrandMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type DeviceBrandCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type DeviceBrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceBrand to aggregate.
     */
    where?: DeviceBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceBrands to fetch.
     */
    orderBy?: DeviceBrandOrderByWithRelationInput | DeviceBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceBrands
    **/
    _count?: true | DeviceBrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceBrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceBrandMaxAggregateInputType
  }

  export type GetDeviceBrandAggregateType<T extends DeviceBrandAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceBrand[P]>
      : GetScalarType<T[P], AggregateDeviceBrand[P]>
  }




  export type DeviceBrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceBrandWhereInput
    orderBy?: DeviceBrandOrderByWithAggregationInput | DeviceBrandOrderByWithAggregationInput[]
    by: DeviceBrandScalarFieldEnum[] | DeviceBrandScalarFieldEnum
    having?: DeviceBrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceBrandCountAggregateInputType | true
    _min?: DeviceBrandMinAggregateInputType
    _max?: DeviceBrandMaxAggregateInputType
  }

  export type DeviceBrandGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: DeviceBrandCountAggregateOutputType | null
    _min: DeviceBrandMinAggregateOutputType | null
    _max: DeviceBrandMaxAggregateOutputType | null
  }

  type GetDeviceBrandGroupByPayload<T extends DeviceBrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceBrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceBrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceBrandGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceBrandGroupByOutputType[P]>
        }
      >
    >


  export type DeviceBrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    models?: boolean | DeviceBrand$modelsArgs<ExtArgs>
    _count?: boolean | DeviceBrandCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceBrand"]>

  export type DeviceBrandSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type DeviceBrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | DeviceBrand$modelsArgs<ExtArgs>
    _count?: boolean | DeviceBrandCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $DeviceBrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeviceBrand"
    objects: {
      models: Prisma.$DeviceModelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["deviceBrand"]>
    composites: {}
  }


  type DeviceBrandGetPayload<S extends boolean | null | undefined | DeviceBrandDefaultArgs> = $Result.GetResult<Prisma.$DeviceBrandPayload, S>

  type DeviceBrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeviceBrandFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeviceBrandCountAggregateInputType | true
    }

  export interface DeviceBrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeviceBrand'], meta: { name: 'DeviceBrand' } }
    /**
     * Find zero or one DeviceBrand that matches the filter.
     * @param {DeviceBrandFindUniqueArgs} args - Arguments to find a DeviceBrand
     * @example
     * // Get one DeviceBrand
     * const deviceBrand = await prisma.deviceBrand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DeviceBrandFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceBrandFindUniqueArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one DeviceBrand that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DeviceBrandFindUniqueOrThrowArgs} args - Arguments to find a DeviceBrand
     * @example
     * // Get one DeviceBrand
     * const deviceBrand = await prisma.deviceBrand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DeviceBrandFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceBrandFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first DeviceBrand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceBrandFindFirstArgs} args - Arguments to find a DeviceBrand
     * @example
     * // Get one DeviceBrand
     * const deviceBrand = await prisma.deviceBrand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DeviceBrandFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceBrandFindFirstArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first DeviceBrand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceBrandFindFirstOrThrowArgs} args - Arguments to find a DeviceBrand
     * @example
     * // Get one DeviceBrand
     * const deviceBrand = await prisma.deviceBrand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DeviceBrandFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceBrandFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more DeviceBrands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceBrandFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceBrands
     * const deviceBrands = await prisma.deviceBrand.findMany()
     * 
     * // Get first 10 DeviceBrands
     * const deviceBrands = await prisma.deviceBrand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceBrandWithIdOnly = await prisma.deviceBrand.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DeviceBrandFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceBrandFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a DeviceBrand.
     * @param {DeviceBrandCreateArgs} args - Arguments to create a DeviceBrand.
     * @example
     * // Create one DeviceBrand
     * const DeviceBrand = await prisma.deviceBrand.create({
     *   data: {
     *     // ... data to create a DeviceBrand
     *   }
     * })
     * 
    **/
    create<T extends DeviceBrandCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceBrandCreateArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a DeviceBrand.
     * @param {DeviceBrandDeleteArgs} args - Arguments to delete one DeviceBrand.
     * @example
     * // Delete one DeviceBrand
     * const DeviceBrand = await prisma.deviceBrand.delete({
     *   where: {
     *     // ... filter to delete one DeviceBrand
     *   }
     * })
     * 
    **/
    delete<T extends DeviceBrandDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceBrandDeleteArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one DeviceBrand.
     * @param {DeviceBrandUpdateArgs} args - Arguments to update one DeviceBrand.
     * @example
     * // Update one DeviceBrand
     * const deviceBrand = await prisma.deviceBrand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DeviceBrandUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceBrandUpdateArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more DeviceBrands.
     * @param {DeviceBrandDeleteManyArgs} args - Arguments to filter DeviceBrands to delete.
     * @example
     * // Delete a few DeviceBrands
     * const { count } = await prisma.deviceBrand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DeviceBrandDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceBrandDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceBrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceBrands
     * const deviceBrand = await prisma.deviceBrand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DeviceBrandUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceBrandUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeviceBrand.
     * @param {DeviceBrandUpsertArgs} args - Arguments to update or create a DeviceBrand.
     * @example
     * // Update or create a DeviceBrand
     * const deviceBrand = await prisma.deviceBrand.upsert({
     *   create: {
     *     // ... data to create a DeviceBrand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceBrand we want to update
     *   }
     * })
    **/
    upsert<T extends DeviceBrandUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceBrandUpsertArgs<ExtArgs>>
    ): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of DeviceBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceBrandCountArgs} args - Arguments to filter DeviceBrands to count.
     * @example
     * // Count the number of DeviceBrands
     * const count = await prisma.deviceBrand.count({
     *   where: {
     *     // ... the filter for the DeviceBrands we want to count
     *   }
     * })
    **/
    count<T extends DeviceBrandCountArgs>(
      args?: Subset<T, DeviceBrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceBrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceBrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceBrandAggregateArgs>(args: Subset<T, DeviceBrandAggregateArgs>): Prisma.PrismaPromise<GetDeviceBrandAggregateType<T>>

    /**
     * Group by DeviceBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceBrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceBrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceBrandGroupByArgs['orderBy'] }
        : { orderBy?: DeviceBrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceBrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeviceBrand model
   */
  readonly fields: DeviceBrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceBrand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceBrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    models<T extends DeviceBrand$modelsArgs<ExtArgs> = {}>(args?: Subset<T, DeviceBrand$modelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the DeviceBrand model
   */ 
  interface DeviceBrandFieldRefs {
    readonly id: FieldRef<"DeviceBrand", 'String'>
    readonly name: FieldRef<"DeviceBrand", 'String'>
    readonly createdAt: FieldRef<"DeviceBrand", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * DeviceBrand findUnique
   */
  export type DeviceBrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * Filter, which DeviceBrand to fetch.
     */
    where: DeviceBrandWhereUniqueInput
  }


  /**
   * DeviceBrand findUniqueOrThrow
   */
  export type DeviceBrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * Filter, which DeviceBrand to fetch.
     */
    where: DeviceBrandWhereUniqueInput
  }


  /**
   * DeviceBrand findFirst
   */
  export type DeviceBrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * Filter, which DeviceBrand to fetch.
     */
    where?: DeviceBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceBrands to fetch.
     */
    orderBy?: DeviceBrandOrderByWithRelationInput | DeviceBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceBrands.
     */
    cursor?: DeviceBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceBrands.
     */
    distinct?: DeviceBrandScalarFieldEnum | DeviceBrandScalarFieldEnum[]
  }


  /**
   * DeviceBrand findFirstOrThrow
   */
  export type DeviceBrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * Filter, which DeviceBrand to fetch.
     */
    where?: DeviceBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceBrands to fetch.
     */
    orderBy?: DeviceBrandOrderByWithRelationInput | DeviceBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceBrands.
     */
    cursor?: DeviceBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceBrands.
     */
    distinct?: DeviceBrandScalarFieldEnum | DeviceBrandScalarFieldEnum[]
  }


  /**
   * DeviceBrand findMany
   */
  export type DeviceBrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * Filter, which DeviceBrands to fetch.
     */
    where?: DeviceBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceBrands to fetch.
     */
    orderBy?: DeviceBrandOrderByWithRelationInput | DeviceBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceBrands.
     */
    cursor?: DeviceBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceBrands.
     */
    skip?: number
    distinct?: DeviceBrandScalarFieldEnum | DeviceBrandScalarFieldEnum[]
  }


  /**
   * DeviceBrand create
   */
  export type DeviceBrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * The data needed to create a DeviceBrand.
     */
    data: XOR<DeviceBrandCreateInput, DeviceBrandUncheckedCreateInput>
  }


  /**
   * DeviceBrand update
   */
  export type DeviceBrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * The data needed to update a DeviceBrand.
     */
    data: XOR<DeviceBrandUpdateInput, DeviceBrandUncheckedUpdateInput>
    /**
     * Choose, which DeviceBrand to update.
     */
    where: DeviceBrandWhereUniqueInput
  }


  /**
   * DeviceBrand updateMany
   */
  export type DeviceBrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceBrands.
     */
    data: XOR<DeviceBrandUpdateManyMutationInput, DeviceBrandUncheckedUpdateManyInput>
    /**
     * Filter which DeviceBrands to update
     */
    where?: DeviceBrandWhereInput
  }


  /**
   * DeviceBrand upsert
   */
  export type DeviceBrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * The filter to search for the DeviceBrand to update in case it exists.
     */
    where: DeviceBrandWhereUniqueInput
    /**
     * In case the DeviceBrand found by the `where` argument doesn't exist, create a new DeviceBrand with this data.
     */
    create: XOR<DeviceBrandCreateInput, DeviceBrandUncheckedCreateInput>
    /**
     * In case the DeviceBrand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceBrandUpdateInput, DeviceBrandUncheckedUpdateInput>
  }


  /**
   * DeviceBrand delete
   */
  export type DeviceBrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
    /**
     * Filter which DeviceBrand to delete.
     */
    where: DeviceBrandWhereUniqueInput
  }


  /**
   * DeviceBrand deleteMany
   */
  export type DeviceBrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceBrands to delete
     */
    where?: DeviceBrandWhereInput
  }


  /**
   * DeviceBrand.models
   */
  export type DeviceBrand$modelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    where?: DeviceModelWhereInput
    orderBy?: DeviceModelOrderByWithRelationInput | DeviceModelOrderByWithRelationInput[]
    cursor?: DeviceModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceModelScalarFieldEnum | DeviceModelScalarFieldEnum[]
  }


  /**
   * DeviceBrand without action
   */
  export type DeviceBrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceBrand
     */
    select?: DeviceBrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceBrandInclude<ExtArgs> | null
  }



  /**
   * Model DeviceModel
   */

  export type AggregateDeviceModel = {
    _count: DeviceModelCountAggregateOutputType | null
    _min: DeviceModelMinAggregateOutputType | null
    _max: DeviceModelMaxAggregateOutputType | null
  }

  export type DeviceModelMinAggregateOutputType = {
    id: string | null
    name: string | null
    brandId: string | null
    typeId: string | null
    createdAt: Date | null
    modelReference: string | null
  }

  export type DeviceModelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    brandId: string | null
    typeId: string | null
    createdAt: Date | null
    modelReference: string | null
  }

  export type DeviceModelCountAggregateOutputType = {
    id: number
    name: number
    brandId: number
    typeId: number
    createdAt: number
    modelReference: number
    _all: number
  }


  export type DeviceModelMinAggregateInputType = {
    id?: true
    name?: true
    brandId?: true
    typeId?: true
    createdAt?: true
    modelReference?: true
  }

  export type DeviceModelMaxAggregateInputType = {
    id?: true
    name?: true
    brandId?: true
    typeId?: true
    createdAt?: true
    modelReference?: true
  }

  export type DeviceModelCountAggregateInputType = {
    id?: true
    name?: true
    brandId?: true
    typeId?: true
    createdAt?: true
    modelReference?: true
    _all?: true
  }

  export type DeviceModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceModel to aggregate.
     */
    where?: DeviceModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceModels to fetch.
     */
    orderBy?: DeviceModelOrderByWithRelationInput | DeviceModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceModels
    **/
    _count?: true | DeviceModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceModelMaxAggregateInputType
  }

  export type GetDeviceModelAggregateType<T extends DeviceModelAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceModel[P]>
      : GetScalarType<T[P], AggregateDeviceModel[P]>
  }




  export type DeviceModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceModelWhereInput
    orderBy?: DeviceModelOrderByWithAggregationInput | DeviceModelOrderByWithAggregationInput[]
    by: DeviceModelScalarFieldEnum[] | DeviceModelScalarFieldEnum
    having?: DeviceModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceModelCountAggregateInputType | true
    _min?: DeviceModelMinAggregateInputType
    _max?: DeviceModelMaxAggregateInputType
  }

  export type DeviceModelGroupByOutputType = {
    id: string
    name: string
    brandId: string
    typeId: string
    createdAt: Date
    modelReference: string | null
    _count: DeviceModelCountAggregateOutputType | null
    _min: DeviceModelMinAggregateOutputType | null
    _max: DeviceModelMaxAggregateOutputType | null
  }

  type GetDeviceModelGroupByPayload<T extends DeviceModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceModelGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceModelGroupByOutputType[P]>
        }
      >
    >


  export type DeviceModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    brandId?: boolean
    typeId?: boolean
    createdAt?: boolean
    modelReference?: boolean
    brand?: boolean | DeviceBrandDefaultArgs<ExtArgs>
    type?: boolean | DeviceTypeDefaultArgs<ExtArgs>
    parts?: boolean | DeviceModel$partsArgs<ExtArgs>
    services?: boolean | DeviceModel$servicesArgs<ExtArgs>
    _count?: boolean | DeviceModelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceModel"]>

  export type DeviceModelSelectScalar = {
    id?: boolean
    name?: boolean
    brandId?: boolean
    typeId?: boolean
    createdAt?: boolean
    modelReference?: boolean
  }

  export type DeviceModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | DeviceBrandDefaultArgs<ExtArgs>
    type?: boolean | DeviceTypeDefaultArgs<ExtArgs>
    parts?: boolean | DeviceModel$partsArgs<ExtArgs>
    services?: boolean | DeviceModel$servicesArgs<ExtArgs>
    _count?: boolean | DeviceModelCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $DeviceModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeviceModel"
    objects: {
      brand: Prisma.$DeviceBrandPayload<ExtArgs>
      type: Prisma.$DeviceTypePayload<ExtArgs>
      parts: Prisma.$PartPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      brandId: string
      typeId: string
      createdAt: Date
      modelReference: string | null
    }, ExtArgs["result"]["deviceModel"]>
    composites: {}
  }


  type DeviceModelGetPayload<S extends boolean | null | undefined | DeviceModelDefaultArgs> = $Result.GetResult<Prisma.$DeviceModelPayload, S>

  type DeviceModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeviceModelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeviceModelCountAggregateInputType | true
    }

  export interface DeviceModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeviceModel'], meta: { name: 'DeviceModel' } }
    /**
     * Find zero or one DeviceModel that matches the filter.
     * @param {DeviceModelFindUniqueArgs} args - Arguments to find a DeviceModel
     * @example
     * // Get one DeviceModel
     * const deviceModel = await prisma.deviceModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DeviceModelFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceModelFindUniqueArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one DeviceModel that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DeviceModelFindUniqueOrThrowArgs} args - Arguments to find a DeviceModel
     * @example
     * // Get one DeviceModel
     * const deviceModel = await prisma.deviceModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DeviceModelFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceModelFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first DeviceModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceModelFindFirstArgs} args - Arguments to find a DeviceModel
     * @example
     * // Get one DeviceModel
     * const deviceModel = await prisma.deviceModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DeviceModelFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceModelFindFirstArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first DeviceModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceModelFindFirstOrThrowArgs} args - Arguments to find a DeviceModel
     * @example
     * // Get one DeviceModel
     * const deviceModel = await prisma.deviceModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DeviceModelFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceModelFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more DeviceModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceModelFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceModels
     * const deviceModels = await prisma.deviceModel.findMany()
     * 
     * // Get first 10 DeviceModels
     * const deviceModels = await prisma.deviceModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceModelWithIdOnly = await prisma.deviceModel.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DeviceModelFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceModelFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a DeviceModel.
     * @param {DeviceModelCreateArgs} args - Arguments to create a DeviceModel.
     * @example
     * // Create one DeviceModel
     * const DeviceModel = await prisma.deviceModel.create({
     *   data: {
     *     // ... data to create a DeviceModel
     *   }
     * })
     * 
    **/
    create<T extends DeviceModelCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceModelCreateArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a DeviceModel.
     * @param {DeviceModelDeleteArgs} args - Arguments to delete one DeviceModel.
     * @example
     * // Delete one DeviceModel
     * const DeviceModel = await prisma.deviceModel.delete({
     *   where: {
     *     // ... filter to delete one DeviceModel
     *   }
     * })
     * 
    **/
    delete<T extends DeviceModelDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceModelDeleteArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one DeviceModel.
     * @param {DeviceModelUpdateArgs} args - Arguments to update one DeviceModel.
     * @example
     * // Update one DeviceModel
     * const deviceModel = await prisma.deviceModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DeviceModelUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceModelUpdateArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more DeviceModels.
     * @param {DeviceModelDeleteManyArgs} args - Arguments to filter DeviceModels to delete.
     * @example
     * // Delete a few DeviceModels
     * const { count } = await prisma.deviceModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DeviceModelDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DeviceModelDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceModels
     * const deviceModel = await prisma.deviceModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DeviceModelUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceModelUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeviceModel.
     * @param {DeviceModelUpsertArgs} args - Arguments to update or create a DeviceModel.
     * @example
     * // Update or create a DeviceModel
     * const deviceModel = await prisma.deviceModel.upsert({
     *   create: {
     *     // ... data to create a DeviceModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceModel we want to update
     *   }
     * })
    **/
    upsert<T extends DeviceModelUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DeviceModelUpsertArgs<ExtArgs>>
    ): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of DeviceModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceModelCountArgs} args - Arguments to filter DeviceModels to count.
     * @example
     * // Count the number of DeviceModels
     * const count = await prisma.deviceModel.count({
     *   where: {
     *     // ... the filter for the DeviceModels we want to count
     *   }
     * })
    **/
    count<T extends DeviceModelCountArgs>(
      args?: Subset<T, DeviceModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceModelAggregateArgs>(args: Subset<T, DeviceModelAggregateArgs>): Prisma.PrismaPromise<GetDeviceModelAggregateType<T>>

    /**
     * Group by DeviceModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceModelGroupByArgs['orderBy'] }
        : { orderBy?: DeviceModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeviceModel model
   */
  readonly fields: DeviceModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    brand<T extends DeviceBrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceBrandDefaultArgs<ExtArgs>>): Prisma__DeviceBrandClient<$Result.GetResult<Prisma.$DeviceBrandPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    type<T extends DeviceTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceTypeDefaultArgs<ExtArgs>>): Prisma__DeviceTypeClient<$Result.GetResult<Prisma.$DeviceTypePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    parts<T extends DeviceModel$partsArgs<ExtArgs> = {}>(args?: Subset<T, DeviceModel$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'findMany'> | Null>;

    services<T extends DeviceModel$servicesArgs<ExtArgs> = {}>(args?: Subset<T, DeviceModel$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the DeviceModel model
   */ 
  interface DeviceModelFieldRefs {
    readonly id: FieldRef<"DeviceModel", 'String'>
    readonly name: FieldRef<"DeviceModel", 'String'>
    readonly brandId: FieldRef<"DeviceModel", 'String'>
    readonly typeId: FieldRef<"DeviceModel", 'String'>
    readonly createdAt: FieldRef<"DeviceModel", 'DateTime'>
    readonly modelReference: FieldRef<"DeviceModel", 'String'>
  }
    

  // Custom InputTypes

  /**
   * DeviceModel findUnique
   */
  export type DeviceModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * Filter, which DeviceModel to fetch.
     */
    where: DeviceModelWhereUniqueInput
  }


  /**
   * DeviceModel findUniqueOrThrow
   */
  export type DeviceModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * Filter, which DeviceModel to fetch.
     */
    where: DeviceModelWhereUniqueInput
  }


  /**
   * DeviceModel findFirst
   */
  export type DeviceModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * Filter, which DeviceModel to fetch.
     */
    where?: DeviceModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceModels to fetch.
     */
    orderBy?: DeviceModelOrderByWithRelationInput | DeviceModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceModels.
     */
    cursor?: DeviceModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceModels.
     */
    distinct?: DeviceModelScalarFieldEnum | DeviceModelScalarFieldEnum[]
  }


  /**
   * DeviceModel findFirstOrThrow
   */
  export type DeviceModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * Filter, which DeviceModel to fetch.
     */
    where?: DeviceModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceModels to fetch.
     */
    orderBy?: DeviceModelOrderByWithRelationInput | DeviceModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceModels.
     */
    cursor?: DeviceModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceModels.
     */
    distinct?: DeviceModelScalarFieldEnum | DeviceModelScalarFieldEnum[]
  }


  /**
   * DeviceModel findMany
   */
  export type DeviceModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * Filter, which DeviceModels to fetch.
     */
    where?: DeviceModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceModels to fetch.
     */
    orderBy?: DeviceModelOrderByWithRelationInput | DeviceModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceModels.
     */
    cursor?: DeviceModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceModels.
     */
    skip?: number
    distinct?: DeviceModelScalarFieldEnum | DeviceModelScalarFieldEnum[]
  }


  /**
   * DeviceModel create
   */
  export type DeviceModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * The data needed to create a DeviceModel.
     */
    data: XOR<DeviceModelCreateInput, DeviceModelUncheckedCreateInput>
  }


  /**
   * DeviceModel update
   */
  export type DeviceModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * The data needed to update a DeviceModel.
     */
    data: XOR<DeviceModelUpdateInput, DeviceModelUncheckedUpdateInput>
    /**
     * Choose, which DeviceModel to update.
     */
    where: DeviceModelWhereUniqueInput
  }


  /**
   * DeviceModel updateMany
   */
  export type DeviceModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceModels.
     */
    data: XOR<DeviceModelUpdateManyMutationInput, DeviceModelUncheckedUpdateManyInput>
    /**
     * Filter which DeviceModels to update
     */
    where?: DeviceModelWhereInput
  }


  /**
   * DeviceModel upsert
   */
  export type DeviceModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * The filter to search for the DeviceModel to update in case it exists.
     */
    where: DeviceModelWhereUniqueInput
    /**
     * In case the DeviceModel found by the `where` argument doesn't exist, create a new DeviceModel with this data.
     */
    create: XOR<DeviceModelCreateInput, DeviceModelUncheckedCreateInput>
    /**
     * In case the DeviceModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceModelUpdateInput, DeviceModelUncheckedUpdateInput>
  }


  /**
   * DeviceModel delete
   */
  export type DeviceModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    /**
     * Filter which DeviceModel to delete.
     */
    where: DeviceModelWhereUniqueInput
  }


  /**
   * DeviceModel deleteMany
   */
  export type DeviceModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceModels to delete
     */
    where?: DeviceModelWhereInput
  }


  /**
   * DeviceModel.parts
   */
  export type DeviceModel$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    where?: PartWhereInput
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    cursor?: PartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }


  /**
   * DeviceModel.services
   */
  export type DeviceModel$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * DeviceModel without action
   */
  export type DeviceModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
  }



  /**
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartAvgAggregateOutputType = {
    costPrice: number | null
    stock: number | null
    minStock: number | null
  }

  export type PartSumAggregateOutputType = {
    costPrice: number | null
    stock: number | null
    minStock: number | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    name: string | null
    sku: string | null
    costPrice: number | null
    stock: number | null
    minStock: number | null
    supplier: string | null
    supplierRef: string | null
    location: string | null
    description: string | null
    modelId: string | null
    createdAt: Date | null
    quality: string | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    name: string | null
    sku: string | null
    costPrice: number | null
    stock: number | null
    minStock: number | null
    supplier: string | null
    supplierRef: string | null
    location: string | null
    description: string | null
    modelId: string | null
    createdAt: Date | null
    quality: string | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    name: number
    sku: number
    costPrice: number
    stock: number
    minStock: number
    supplier: number
    supplierRef: number
    location: number
    description: number
    modelId: number
    createdAt: number
    quality: number
    _all: number
  }


  export type PartAvgAggregateInputType = {
    costPrice?: true
    stock?: true
    minStock?: true
  }

  export type PartSumAggregateInputType = {
    costPrice?: true
    stock?: true
    minStock?: true
  }

  export type PartMinAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    costPrice?: true
    stock?: true
    minStock?: true
    supplier?: true
    supplierRef?: true
    location?: true
    description?: true
    modelId?: true
    createdAt?: true
    quality?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    costPrice?: true
    stock?: true
    minStock?: true
    supplier?: true
    supplierRef?: true
    location?: true
    description?: true
    modelId?: true
    createdAt?: true
    quality?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    costPrice?: true
    stock?: true
    minStock?: true
    supplier?: true
    supplierRef?: true
    location?: true
    description?: true
    modelId?: true
    createdAt?: true
    quality?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _avg?: PartAvgAggregateInputType
    _sum?: PartSumAggregateInputType
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    name: string
    sku: string
    costPrice: number
    stock: number
    minStock: number
    supplier: string | null
    supplierRef: string | null
    location: string | null
    description: string | null
    modelId: string | null
    createdAt: Date
    quality: string | null
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sku?: boolean
    costPrice?: boolean
    stock?: boolean
    minStock?: boolean
    supplier?: boolean
    supplierRef?: boolean
    location?: boolean
    description?: boolean
    modelId?: boolean
    createdAt?: boolean
    quality?: boolean
    model?: boolean | Part$modelArgs<ExtArgs>
    services?: boolean | Part$servicesArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectScalar = {
    id?: boolean
    name?: boolean
    sku?: boolean
    costPrice?: boolean
    stock?: boolean
    minStock?: boolean
    supplier?: boolean
    supplierRef?: boolean
    location?: boolean
    description?: boolean
    modelId?: boolean
    createdAt?: boolean
    quality?: boolean
  }

  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | Part$modelArgs<ExtArgs>
    services?: boolean | Part$servicesArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      model: Prisma.$DeviceModelPayload<ExtArgs> | null
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      sku: string
      costPrice: number
      stock: number
      minStock: number
      supplier: string | null
      supplierRef: string | null
      location: string | null
      description: string | null
      modelId: string | null
      createdAt: Date
      quality: string | null
    }, ExtArgs["result"]["part"]>
    composites: {}
  }


  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PartFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Part that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PartFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PartFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
    **/
    create<T extends PartCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PartCreateArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
    **/
    delete<T extends PartDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PartDeleteArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PartUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PartUpdateArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PartDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PartUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
    **/
    upsert<T extends PartUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PartUpsertArgs<ExtArgs>>
    ): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    model<T extends Part$modelArgs<ExtArgs> = {}>(args?: Subset<T, Part$modelArgs<ExtArgs>>): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    services<T extends Part$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Part$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Part model
   */ 
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly name: FieldRef<"Part", 'String'>
    readonly sku: FieldRef<"Part", 'String'>
    readonly costPrice: FieldRef<"Part", 'Float'>
    readonly stock: FieldRef<"Part", 'Int'>
    readonly minStock: FieldRef<"Part", 'Int'>
    readonly supplier: FieldRef<"Part", 'String'>
    readonly supplierRef: FieldRef<"Part", 'String'>
    readonly location: FieldRef<"Part", 'String'>
    readonly description: FieldRef<"Part", 'String'>
    readonly modelId: FieldRef<"Part", 'String'>
    readonly createdAt: FieldRef<"Part", 'DateTime'>
    readonly quality: FieldRef<"Part", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }


  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }


  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }


  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }


  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }


  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }


  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }


  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
  }


  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }


  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }


  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
  }


  /**
   * Part.model
   */
  export type Part$modelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    where?: DeviceModelWhereInput
  }


  /**
   * Part.services
   */
  export type Part$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
  }



  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    laborCost: number | null
    suggestedPrice: number | null
    duration: number | null
  }

  export type ServiceSumAggregateOutputType = {
    laborCost: number | null
    suggestedPrice: number | null
    duration: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    laborCost: number | null
    suggestedPrice: number | null
    duration: number | null
    partId: string | null
    modelId: string | null
    description: string | null
    createdAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    laborCost: number | null
    suggestedPrice: number | null
    duration: number | null
    partId: string | null
    modelId: string | null
    description: string | null
    createdAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    laborCost: number
    suggestedPrice: number
    duration: number
    partId: number
    modelId: number
    description: number
    createdAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    laborCost?: true
    suggestedPrice?: true
    duration?: true
  }

  export type ServiceSumAggregateInputType = {
    laborCost?: true
    suggestedPrice?: true
    duration?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    laborCost?: true
    suggestedPrice?: true
    duration?: true
    partId?: true
    modelId?: true
    description?: true
    createdAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    laborCost?: true
    suggestedPrice?: true
    duration?: true
    partId?: true
    modelId?: true
    description?: true
    createdAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    laborCost?: true
    suggestedPrice?: true
    duration?: true
    partId?: true
    modelId?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    laborCost: number
    suggestedPrice: number
    duration: number
    partId: string | null
    modelId: string | null
    description: string | null
    createdAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    laborCost?: boolean
    suggestedPrice?: boolean
    duration?: boolean
    partId?: boolean
    modelId?: boolean
    description?: boolean
    createdAt?: boolean
    repairs?: boolean | Service$repairsArgs<ExtArgs>
    part?: boolean | Service$partArgs<ExtArgs>
    model?: boolean | Service$modelArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    laborCost?: boolean
    suggestedPrice?: boolean
    duration?: boolean
    partId?: boolean
    modelId?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairs?: boolean | Service$repairsArgs<ExtArgs>
    part?: boolean | Service$partArgs<ExtArgs>
    model?: boolean | Service$modelArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      repairs: Prisma.$RepairServicePayload<ExtArgs>[]
      part: Prisma.$PartPayload<ExtArgs> | null
      model: Prisma.$DeviceModelPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      laborCost: number
      suggestedPrice: number
      duration: number
      partId: string | null
      modelId: string | null
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }


  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServiceFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Service that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServiceFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ServiceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
    **/
    create<T extends ServiceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
    **/
    delete<T extends ServiceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServiceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServiceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServiceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
    **/
    upsert<T extends ServiceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    repairs<T extends Service$repairsArgs<ExtArgs> = {}>(args?: Subset<T, Service$repairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'findMany'> | Null>;

    part<T extends Service$partArgs<ExtArgs> = {}>(args?: Subset<T, Service$partArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    model<T extends Service$modelArgs<ExtArgs> = {}>(args?: Subset<T, Service$modelArgs<ExtArgs>>): Prisma__DeviceModelClient<$Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Service model
   */ 
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly laborCost: FieldRef<"Service", 'Float'>
    readonly suggestedPrice: FieldRef<"Service", 'Float'>
    readonly duration: FieldRef<"Service", 'Int'>
    readonly partId: FieldRef<"Service", 'String'>
    readonly modelId: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }


  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
  }


  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }


  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
  }


  /**
   * Service.repairs
   */
  export type Service$repairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    where?: RepairServiceWhereInput
    orderBy?: RepairServiceOrderByWithRelationInput | RepairServiceOrderByWithRelationInput[]
    cursor?: RepairServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairServiceScalarFieldEnum | RepairServiceScalarFieldEnum[]
  }


  /**
   * Service.part
   */
  export type Service$partArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PartInclude<ExtArgs> | null
    where?: PartWhereInput
  }


  /**
   * Service.model
   */
  export type Service$modelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceModel
     */
    select?: DeviceModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DeviceModelInclude<ExtArgs> | null
    where?: DeviceModelWhereInput
  }


  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
  }



  /**
   * Model Repair
   */

  export type AggregateRepair = {
    _count: RepairCountAggregateOutputType | null
    _min: RepairMinAggregateOutputType | null
    _max: RepairMaxAggregateOutputType | null
  }

  export type RepairMinAggregateOutputType = {
    id: string | null
    status: string | null
    partStatus: string | null
    clientId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RepairMaxAggregateOutputType = {
    id: string | null
    status: string | null
    partStatus: string | null
    clientId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RepairCountAggregateOutputType = {
    id: number
    status: number
    partStatus: number
    clientId: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RepairMinAggregateInputType = {
    id?: true
    status?: true
    partStatus?: true
    clientId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RepairMaxAggregateInputType = {
    id?: true
    status?: true
    partStatus?: true
    clientId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RepairCountAggregateInputType = {
    id?: true
    status?: true
    partStatus?: true
    clientId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RepairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repair to aggregate.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Repairs
    **/
    _count?: true | RepairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairMaxAggregateInputType
  }

  export type GetRepairAggregateType<T extends RepairAggregateArgs> = {
        [P in keyof T & keyof AggregateRepair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepair[P]>
      : GetScalarType<T[P], AggregateRepair[P]>
  }




  export type RepairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairWhereInput
    orderBy?: RepairOrderByWithAggregationInput | RepairOrderByWithAggregationInput[]
    by: RepairScalarFieldEnum[] | RepairScalarFieldEnum
    having?: RepairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairCountAggregateInputType | true
    _min?: RepairMinAggregateInputType
    _max?: RepairMaxAggregateInputType
  }

  export type RepairGroupByOutputType = {
    id: string
    status: string
    partStatus: string
    clientId: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: RepairCountAggregateOutputType | null
    _min: RepairMinAggregateOutputType | null
    _max: RepairMaxAggregateOutputType | null
  }

  type GetRepairGroupByPayload<T extends RepairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairGroupByOutputType[P]>
            : GetScalarType<T[P], RepairGroupByOutputType[P]>
        }
      >
    >


  export type RepairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    partStatus?: boolean
    clientId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoices?: boolean | Repair$invoicesArgs<ExtArgs>
    quotes?: boolean | Repair$quotesArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    logs?: boolean | Repair$logsArgs<ExtArgs>
    services?: boolean | Repair$servicesArgs<ExtArgs>
    _count?: boolean | RepairCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repair"]>

  export type RepairSelectScalar = {
    id?: boolean
    status?: boolean
    partStatus?: boolean
    clientId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RepairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | Repair$invoicesArgs<ExtArgs>
    quotes?: boolean | Repair$quotesArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    logs?: boolean | Repair$logsArgs<ExtArgs>
    services?: boolean | Repair$servicesArgs<ExtArgs>
    _count?: boolean | RepairCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $RepairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Repair"
    objects: {
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      quotes: Prisma.$QuotePayload<ExtArgs>[]
      client: Prisma.$ClientPayload<ExtArgs>
      logs: Prisma.$RepairLogPayload<ExtArgs>[]
      services: Prisma.$RepairServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      partStatus: string
      clientId: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["repair"]>
    composites: {}
  }


  type RepairGetPayload<S extends boolean | null | undefined | RepairDefaultArgs> = $Result.GetResult<Prisma.$RepairPayload, S>

  type RepairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RepairFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RepairCountAggregateInputType | true
    }

  export interface RepairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Repair'], meta: { name: 'Repair' } }
    /**
     * Find zero or one Repair that matches the filter.
     * @param {RepairFindUniqueArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RepairFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RepairFindUniqueArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Repair that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RepairFindUniqueOrThrowArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RepairFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Repair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindFirstArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RepairFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairFindFirstArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Repair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindFirstOrThrowArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RepairFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Repairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repairs
     * const repairs = await prisma.repair.findMany()
     * 
     * // Get first 10 Repairs
     * const repairs = await prisma.repair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairWithIdOnly = await prisma.repair.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RepairFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Repair.
     * @param {RepairCreateArgs} args - Arguments to create a Repair.
     * @example
     * // Create one Repair
     * const Repair = await prisma.repair.create({
     *   data: {
     *     // ... data to create a Repair
     *   }
     * })
     * 
    **/
    create<T extends RepairCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RepairCreateArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Repair.
     * @param {RepairDeleteArgs} args - Arguments to delete one Repair.
     * @example
     * // Delete one Repair
     * const Repair = await prisma.repair.delete({
     *   where: {
     *     // ... filter to delete one Repair
     *   }
     * })
     * 
    **/
    delete<T extends RepairDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RepairDeleteArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Repair.
     * @param {RepairUpdateArgs} args - Arguments to update one Repair.
     * @example
     * // Update one Repair
     * const repair = await prisma.repair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RepairUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RepairUpdateArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Repairs.
     * @param {RepairDeleteManyArgs} args - Arguments to filter Repairs to delete.
     * @example
     * // Delete a few Repairs
     * const { count } = await prisma.repair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RepairDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repairs
     * const repair = await prisma.repair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RepairUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RepairUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Repair.
     * @param {RepairUpsertArgs} args - Arguments to update or create a Repair.
     * @example
     * // Update or create a Repair
     * const repair = await prisma.repair.upsert({
     *   create: {
     *     // ... data to create a Repair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repair we want to update
     *   }
     * })
    **/
    upsert<T extends RepairUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RepairUpsertArgs<ExtArgs>>
    ): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Repairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairCountArgs} args - Arguments to filter Repairs to count.
     * @example
     * // Count the number of Repairs
     * const count = await prisma.repair.count({
     *   where: {
     *     // ... the filter for the Repairs we want to count
     *   }
     * })
    **/
    count<T extends RepairCountArgs>(
      args?: Subset<T, RepairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Repair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairAggregateArgs>(args: Subset<T, RepairAggregateArgs>): Prisma.PrismaPromise<GetRepairAggregateType<T>>

    /**
     * Group by Repair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairGroupByArgs['orderBy'] }
        : { orderBy?: RepairGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Repair model
   */
  readonly fields: RepairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Repair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    invoices<T extends Repair$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Repair$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, 'findMany'> | Null>;

    quotes<T extends Repair$quotesArgs<ExtArgs> = {}>(args?: Subset<T, Repair$quotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, 'findMany'> | Null>;

    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    logs<T extends Repair$logsArgs<ExtArgs> = {}>(args?: Subset<T, Repair$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'findMany'> | Null>;

    services<T extends Repair$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Repair$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Repair model
   */ 
  interface RepairFieldRefs {
    readonly id: FieldRef<"Repair", 'String'>
    readonly status: FieldRef<"Repair", 'String'>
    readonly partStatus: FieldRef<"Repair", 'String'>
    readonly clientId: FieldRef<"Repair", 'String'>
    readonly notes: FieldRef<"Repair", 'String'>
    readonly createdAt: FieldRef<"Repair", 'DateTime'>
    readonly updatedAt: FieldRef<"Repair", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Repair findUnique
   */
  export type RepairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where: RepairWhereUniqueInput
  }


  /**
   * Repair findUniqueOrThrow
   */
  export type RepairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where: RepairWhereUniqueInput
  }


  /**
   * Repair findFirst
   */
  export type RepairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repairs.
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repairs.
     */
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }


  /**
   * Repair findFirstOrThrow
   */
  export type RepairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repair to fetch.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repairs.
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repairs.
     */
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }


  /**
   * Repair findMany
   */
  export type RepairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter, which Repairs to fetch.
     */
    where?: RepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repairs to fetch.
     */
    orderBy?: RepairOrderByWithRelationInput | RepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Repairs.
     */
    cursor?: RepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repairs.
     */
    skip?: number
    distinct?: RepairScalarFieldEnum | RepairScalarFieldEnum[]
  }


  /**
   * Repair create
   */
  export type RepairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * The data needed to create a Repair.
     */
    data: XOR<RepairCreateInput, RepairUncheckedCreateInput>
  }


  /**
   * Repair update
   */
  export type RepairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * The data needed to update a Repair.
     */
    data: XOR<RepairUpdateInput, RepairUncheckedUpdateInput>
    /**
     * Choose, which Repair to update.
     */
    where: RepairWhereUniqueInput
  }


  /**
   * Repair updateMany
   */
  export type RepairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Repairs.
     */
    data: XOR<RepairUpdateManyMutationInput, RepairUncheckedUpdateManyInput>
    /**
     * Filter which Repairs to update
     */
    where?: RepairWhereInput
  }


  /**
   * Repair upsert
   */
  export type RepairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * The filter to search for the Repair to update in case it exists.
     */
    where: RepairWhereUniqueInput
    /**
     * In case the Repair found by the `where` argument doesn't exist, create a new Repair with this data.
     */
    create: XOR<RepairCreateInput, RepairUncheckedCreateInput>
    /**
     * In case the Repair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairUpdateInput, RepairUncheckedUpdateInput>
  }


  /**
   * Repair delete
   */
  export type RepairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
    /**
     * Filter which Repair to delete.
     */
    where: RepairWhereUniqueInput
  }


  /**
   * Repair deleteMany
   */
  export type RepairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repairs to delete
     */
    where?: RepairWhereInput
  }


  /**
   * Repair.invoices
   */
  export type Repair$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }


  /**
   * Repair.quotes
   */
  export type Repair$quotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: QuoteInclude<ExtArgs> | null
    where?: QuoteWhereInput
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    cursor?: QuoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }


  /**
   * Repair.logs
   */
  export type Repair$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    where?: RepairLogWhereInput
    orderBy?: RepairLogOrderByWithRelationInput | RepairLogOrderByWithRelationInput[]
    cursor?: RepairLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairLogScalarFieldEnum | RepairLogScalarFieldEnum[]
  }


  /**
   * Repair.services
   */
  export type Repair$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    where?: RepairServiceWhereInput
    orderBy?: RepairServiceOrderByWithRelationInput | RepairServiceOrderByWithRelationInput[]
    cursor?: RepairServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairServiceScalarFieldEnum | RepairServiceScalarFieldEnum[]
  }


  /**
   * Repair without action
   */
  export type RepairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: RepairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairInclude<ExtArgs> | null
  }



  /**
   * Model RepairService
   */

  export type AggregateRepairService = {
    _count: RepairServiceCountAggregateOutputType | null
    _avg: RepairServiceAvgAggregateOutputType | null
    _sum: RepairServiceSumAggregateOutputType | null
    _min: RepairServiceMinAggregateOutputType | null
    _max: RepairServiceMaxAggregateOutputType | null
  }

  export type RepairServiceAvgAggregateOutputType = {
    quantity: number | null
    priceAtTime: number | null
  }

  export type RepairServiceSumAggregateOutputType = {
    quantity: number | null
    priceAtTime: number | null
  }

  export type RepairServiceMinAggregateOutputType = {
    id: string | null
    repairId: string | null
    serviceId: string | null
    quantity: number | null
    priceAtTime: number | null
  }

  export type RepairServiceMaxAggregateOutputType = {
    id: string | null
    repairId: string | null
    serviceId: string | null
    quantity: number | null
    priceAtTime: number | null
  }

  export type RepairServiceCountAggregateOutputType = {
    id: number
    repairId: number
    serviceId: number
    quantity: number
    priceAtTime: number
    _all: number
  }


  export type RepairServiceAvgAggregateInputType = {
    quantity?: true
    priceAtTime?: true
  }

  export type RepairServiceSumAggregateInputType = {
    quantity?: true
    priceAtTime?: true
  }

  export type RepairServiceMinAggregateInputType = {
    id?: true
    repairId?: true
    serviceId?: true
    quantity?: true
    priceAtTime?: true
  }

  export type RepairServiceMaxAggregateInputType = {
    id?: true
    repairId?: true
    serviceId?: true
    quantity?: true
    priceAtTime?: true
  }

  export type RepairServiceCountAggregateInputType = {
    id?: true
    repairId?: true
    serviceId?: true
    quantity?: true
    priceAtTime?: true
    _all?: true
  }

  export type RepairServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairService to aggregate.
     */
    where?: RepairServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairServices to fetch.
     */
    orderBy?: RepairServiceOrderByWithRelationInput | RepairServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepairServices
    **/
    _count?: true | RepairServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepairServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepairServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairServiceMaxAggregateInputType
  }

  export type GetRepairServiceAggregateType<T extends RepairServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateRepairService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepairService[P]>
      : GetScalarType<T[P], AggregateRepairService[P]>
  }




  export type RepairServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairServiceWhereInput
    orderBy?: RepairServiceOrderByWithAggregationInput | RepairServiceOrderByWithAggregationInput[]
    by: RepairServiceScalarFieldEnum[] | RepairServiceScalarFieldEnum
    having?: RepairServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairServiceCountAggregateInputType | true
    _avg?: RepairServiceAvgAggregateInputType
    _sum?: RepairServiceSumAggregateInputType
    _min?: RepairServiceMinAggregateInputType
    _max?: RepairServiceMaxAggregateInputType
  }

  export type RepairServiceGroupByOutputType = {
    id: string
    repairId: string
    serviceId: string
    quantity: number
    priceAtTime: number
    _count: RepairServiceCountAggregateOutputType | null
    _avg: RepairServiceAvgAggregateOutputType | null
    _sum: RepairServiceSumAggregateOutputType | null
    _min: RepairServiceMinAggregateOutputType | null
    _max: RepairServiceMaxAggregateOutputType | null
  }

  type GetRepairServiceGroupByPayload<T extends RepairServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairServiceGroupByOutputType[P]>
            : GetScalarType<T[P], RepairServiceGroupByOutputType[P]>
        }
      >
    >


  export type RepairServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairId?: boolean
    serviceId?: boolean
    quantity?: boolean
    priceAtTime?: boolean
    repair?: boolean | RepairDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairService"]>

  export type RepairServiceSelectScalar = {
    id?: boolean
    repairId?: boolean
    serviceId?: boolean
    quantity?: boolean
    priceAtTime?: boolean
  }

  export type RepairServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repair?: boolean | RepairDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }


  export type $RepairServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepairService"
    objects: {
      repair: Prisma.$RepairPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repairId: string
      serviceId: string
      quantity: number
      priceAtTime: number
    }, ExtArgs["result"]["repairService"]>
    composites: {}
  }


  type RepairServiceGetPayload<S extends boolean | null | undefined | RepairServiceDefaultArgs> = $Result.GetResult<Prisma.$RepairServicePayload, S>

  type RepairServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RepairServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RepairServiceCountAggregateInputType | true
    }

  export interface RepairServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepairService'], meta: { name: 'RepairService' } }
    /**
     * Find zero or one RepairService that matches the filter.
     * @param {RepairServiceFindUniqueArgs} args - Arguments to find a RepairService
     * @example
     * // Get one RepairService
     * const repairService = await prisma.repairService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RepairServiceFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RepairServiceFindUniqueArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one RepairService that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RepairServiceFindUniqueOrThrowArgs} args - Arguments to find a RepairService
     * @example
     * // Get one RepairService
     * const repairService = await prisma.repairService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RepairServiceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairServiceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first RepairService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairServiceFindFirstArgs} args - Arguments to find a RepairService
     * @example
     * // Get one RepairService
     * const repairService = await prisma.repairService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RepairServiceFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairServiceFindFirstArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first RepairService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairServiceFindFirstOrThrowArgs} args - Arguments to find a RepairService
     * @example
     * // Get one RepairService
     * const repairService = await prisma.repairService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RepairServiceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairServiceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more RepairServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairServiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairServices
     * const repairServices = await prisma.repairService.findMany()
     * 
     * // Get first 10 RepairServices
     * const repairServices = await prisma.repairService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairServiceWithIdOnly = await prisma.repairService.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RepairServiceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairServiceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a RepairService.
     * @param {RepairServiceCreateArgs} args - Arguments to create a RepairService.
     * @example
     * // Create one RepairService
     * const RepairService = await prisma.repairService.create({
     *   data: {
     *     // ... data to create a RepairService
     *   }
     * })
     * 
    **/
    create<T extends RepairServiceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RepairServiceCreateArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a RepairService.
     * @param {RepairServiceDeleteArgs} args - Arguments to delete one RepairService.
     * @example
     * // Delete one RepairService
     * const RepairService = await prisma.repairService.delete({
     *   where: {
     *     // ... filter to delete one RepairService
     *   }
     * })
     * 
    **/
    delete<T extends RepairServiceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RepairServiceDeleteArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one RepairService.
     * @param {RepairServiceUpdateArgs} args - Arguments to update one RepairService.
     * @example
     * // Update one RepairService
     * const repairService = await prisma.repairService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RepairServiceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RepairServiceUpdateArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more RepairServices.
     * @param {RepairServiceDeleteManyArgs} args - Arguments to filter RepairServices to delete.
     * @example
     * // Delete a few RepairServices
     * const { count } = await prisma.repairService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RepairServiceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairServiceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairServices
     * const repairService = await prisma.repairService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RepairServiceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RepairServiceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RepairService.
     * @param {RepairServiceUpsertArgs} args - Arguments to update or create a RepairService.
     * @example
     * // Update or create a RepairService
     * const repairService = await prisma.repairService.upsert({
     *   create: {
     *     // ... data to create a RepairService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairService we want to update
     *   }
     * })
    **/
    upsert<T extends RepairServiceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RepairServiceUpsertArgs<ExtArgs>>
    ): Prisma__RepairServiceClient<$Result.GetResult<Prisma.$RepairServicePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of RepairServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairServiceCountArgs} args - Arguments to filter RepairServices to count.
     * @example
     * // Count the number of RepairServices
     * const count = await prisma.repairService.count({
     *   where: {
     *     // ... the filter for the RepairServices we want to count
     *   }
     * })
    **/
    count<T extends RepairServiceCountArgs>(
      args?: Subset<T, RepairServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepairService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairServiceAggregateArgs>(args: Subset<T, RepairServiceAggregateArgs>): Prisma.PrismaPromise<GetRepairServiceAggregateType<T>>

    /**
     * Group by RepairService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairServiceGroupByArgs['orderBy'] }
        : { orderBy?: RepairServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepairService model
   */
  readonly fields: RepairServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepairService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    repair<T extends RepairDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepairDefaultArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the RepairService model
   */ 
  interface RepairServiceFieldRefs {
    readonly id: FieldRef<"RepairService", 'String'>
    readonly repairId: FieldRef<"RepairService", 'String'>
    readonly serviceId: FieldRef<"RepairService", 'String'>
    readonly quantity: FieldRef<"RepairService", 'Int'>
    readonly priceAtTime: FieldRef<"RepairService", 'Float'>
  }
    

  // Custom InputTypes

  /**
   * RepairService findUnique
   */
  export type RepairServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * Filter, which RepairService to fetch.
     */
    where: RepairServiceWhereUniqueInput
  }


  /**
   * RepairService findUniqueOrThrow
   */
  export type RepairServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * Filter, which RepairService to fetch.
     */
    where: RepairServiceWhereUniqueInput
  }


  /**
   * RepairService findFirst
   */
  export type RepairServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * Filter, which RepairService to fetch.
     */
    where?: RepairServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairServices to fetch.
     */
    orderBy?: RepairServiceOrderByWithRelationInput | RepairServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairServices.
     */
    cursor?: RepairServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairServices.
     */
    distinct?: RepairServiceScalarFieldEnum | RepairServiceScalarFieldEnum[]
  }


  /**
   * RepairService findFirstOrThrow
   */
  export type RepairServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * Filter, which RepairService to fetch.
     */
    where?: RepairServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairServices to fetch.
     */
    orderBy?: RepairServiceOrderByWithRelationInput | RepairServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairServices.
     */
    cursor?: RepairServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairServices.
     */
    distinct?: RepairServiceScalarFieldEnum | RepairServiceScalarFieldEnum[]
  }


  /**
   * RepairService findMany
   */
  export type RepairServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * Filter, which RepairServices to fetch.
     */
    where?: RepairServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairServices to fetch.
     */
    orderBy?: RepairServiceOrderByWithRelationInput | RepairServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepairServices.
     */
    cursor?: RepairServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairServices.
     */
    skip?: number
    distinct?: RepairServiceScalarFieldEnum | RepairServiceScalarFieldEnum[]
  }


  /**
   * RepairService create
   */
  export type RepairServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a RepairService.
     */
    data: XOR<RepairServiceCreateInput, RepairServiceUncheckedCreateInput>
  }


  /**
   * RepairService update
   */
  export type RepairServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a RepairService.
     */
    data: XOR<RepairServiceUpdateInput, RepairServiceUncheckedUpdateInput>
    /**
     * Choose, which RepairService to update.
     */
    where: RepairServiceWhereUniqueInput
  }


  /**
   * RepairService updateMany
   */
  export type RepairServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairServices.
     */
    data: XOR<RepairServiceUpdateManyMutationInput, RepairServiceUncheckedUpdateManyInput>
    /**
     * Filter which RepairServices to update
     */
    where?: RepairServiceWhereInput
  }


  /**
   * RepairService upsert
   */
  export type RepairServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the RepairService to update in case it exists.
     */
    where: RepairServiceWhereUniqueInput
    /**
     * In case the RepairService found by the `where` argument doesn't exist, create a new RepairService with this data.
     */
    create: XOR<RepairServiceCreateInput, RepairServiceUncheckedCreateInput>
    /**
     * In case the RepairService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairServiceUpdateInput, RepairServiceUncheckedUpdateInput>
  }


  /**
   * RepairService delete
   */
  export type RepairServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
    /**
     * Filter which RepairService to delete.
     */
    where: RepairServiceWhereUniqueInput
  }


  /**
   * RepairService deleteMany
   */
  export type RepairServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairServices to delete
     */
    where?: RepairServiceWhereInput
  }


  /**
   * RepairService without action
   */
  export type RepairServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairService
     */
    select?: RepairServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairServiceInclude<ExtArgs> | null
  }



  /**
   * Model RepairLog
   */

  export type AggregateRepairLog = {
    _count: RepairLogCountAggregateOutputType | null
    _min: RepairLogMinAggregateOutputType | null
    _max: RepairLogMaxAggregateOutputType | null
  }

  export type RepairLogMinAggregateOutputType = {
    id: string | null
    repairId: string | null
    status: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type RepairLogMaxAggregateOutputType = {
    id: string | null
    repairId: string | null
    status: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type RepairLogCountAggregateOutputType = {
    id: number
    repairId: number
    status: number
    comment: number
    createdAt: number
    _all: number
  }


  export type RepairLogMinAggregateInputType = {
    id?: true
    repairId?: true
    status?: true
    comment?: true
    createdAt?: true
  }

  export type RepairLogMaxAggregateInputType = {
    id?: true
    repairId?: true
    status?: true
    comment?: true
    createdAt?: true
  }

  export type RepairLogCountAggregateInputType = {
    id?: true
    repairId?: true
    status?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type RepairLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairLog to aggregate.
     */
    where?: RepairLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairLogs to fetch.
     */
    orderBy?: RepairLogOrderByWithRelationInput | RepairLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepairLogs
    **/
    _count?: true | RepairLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairLogMaxAggregateInputType
  }

  export type GetRepairLogAggregateType<T extends RepairLogAggregateArgs> = {
        [P in keyof T & keyof AggregateRepairLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepairLog[P]>
      : GetScalarType<T[P], AggregateRepairLog[P]>
  }




  export type RepairLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairLogWhereInput
    orderBy?: RepairLogOrderByWithAggregationInput | RepairLogOrderByWithAggregationInput[]
    by: RepairLogScalarFieldEnum[] | RepairLogScalarFieldEnum
    having?: RepairLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairLogCountAggregateInputType | true
    _min?: RepairLogMinAggregateInputType
    _max?: RepairLogMaxAggregateInputType
  }

  export type RepairLogGroupByOutputType = {
    id: string
    repairId: string
    status: string
    comment: string | null
    createdAt: Date
    _count: RepairLogCountAggregateOutputType | null
    _min: RepairLogMinAggregateOutputType | null
    _max: RepairLogMaxAggregateOutputType | null
  }

  type GetRepairLogGroupByPayload<T extends RepairLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairLogGroupByOutputType[P]>
            : GetScalarType<T[P], RepairLogGroupByOutputType[P]>
        }
      >
    >


  export type RepairLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairId?: boolean
    status?: boolean
    comment?: boolean
    createdAt?: boolean
    repair?: boolean | RepairDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairLog"]>

  export type RepairLogSelectScalar = {
    id?: boolean
    repairId?: boolean
    status?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type RepairLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repair?: boolean | RepairDefaultArgs<ExtArgs>
  }


  export type $RepairLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepairLog"
    objects: {
      repair: Prisma.$RepairPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repairId: string
      status: string
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["repairLog"]>
    composites: {}
  }


  type RepairLogGetPayload<S extends boolean | null | undefined | RepairLogDefaultArgs> = $Result.GetResult<Prisma.$RepairLogPayload, S>

  type RepairLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RepairLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RepairLogCountAggregateInputType | true
    }

  export interface RepairLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepairLog'], meta: { name: 'RepairLog' } }
    /**
     * Find zero or one RepairLog that matches the filter.
     * @param {RepairLogFindUniqueArgs} args - Arguments to find a RepairLog
     * @example
     * // Get one RepairLog
     * const repairLog = await prisma.repairLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RepairLogFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RepairLogFindUniqueArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one RepairLog that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RepairLogFindUniqueOrThrowArgs} args - Arguments to find a RepairLog
     * @example
     * // Get one RepairLog
     * const repairLog = await prisma.repairLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RepairLogFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairLogFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first RepairLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairLogFindFirstArgs} args - Arguments to find a RepairLog
     * @example
     * // Get one RepairLog
     * const repairLog = await prisma.repairLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RepairLogFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairLogFindFirstArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first RepairLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairLogFindFirstOrThrowArgs} args - Arguments to find a RepairLog
     * @example
     * // Get one RepairLog
     * const repairLog = await prisma.repairLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RepairLogFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairLogFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more RepairLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairLogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairLogs
     * const repairLogs = await prisma.repairLog.findMany()
     * 
     * // Get first 10 RepairLogs
     * const repairLogs = await prisma.repairLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairLogWithIdOnly = await prisma.repairLog.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RepairLogFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairLogFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a RepairLog.
     * @param {RepairLogCreateArgs} args - Arguments to create a RepairLog.
     * @example
     * // Create one RepairLog
     * const RepairLog = await prisma.repairLog.create({
     *   data: {
     *     // ... data to create a RepairLog
     *   }
     * })
     * 
    **/
    create<T extends RepairLogCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RepairLogCreateArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a RepairLog.
     * @param {RepairLogDeleteArgs} args - Arguments to delete one RepairLog.
     * @example
     * // Delete one RepairLog
     * const RepairLog = await prisma.repairLog.delete({
     *   where: {
     *     // ... filter to delete one RepairLog
     *   }
     * })
     * 
    **/
    delete<T extends RepairLogDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RepairLogDeleteArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one RepairLog.
     * @param {RepairLogUpdateArgs} args - Arguments to update one RepairLog.
     * @example
     * // Update one RepairLog
     * const repairLog = await prisma.repairLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RepairLogUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RepairLogUpdateArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more RepairLogs.
     * @param {RepairLogDeleteManyArgs} args - Arguments to filter RepairLogs to delete.
     * @example
     * // Delete a few RepairLogs
     * const { count } = await prisma.repairLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RepairLogDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RepairLogDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairLogs
     * const repairLog = await prisma.repairLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RepairLogUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RepairLogUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RepairLog.
     * @param {RepairLogUpsertArgs} args - Arguments to update or create a RepairLog.
     * @example
     * // Update or create a RepairLog
     * const repairLog = await prisma.repairLog.upsert({
     *   create: {
     *     // ... data to create a RepairLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairLog we want to update
     *   }
     * })
    **/
    upsert<T extends RepairLogUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RepairLogUpsertArgs<ExtArgs>>
    ): Prisma__RepairLogClient<$Result.GetResult<Prisma.$RepairLogPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of RepairLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairLogCountArgs} args - Arguments to filter RepairLogs to count.
     * @example
     * // Count the number of RepairLogs
     * const count = await prisma.repairLog.count({
     *   where: {
     *     // ... the filter for the RepairLogs we want to count
     *   }
     * })
    **/
    count<T extends RepairLogCountArgs>(
      args?: Subset<T, RepairLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepairLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairLogAggregateArgs>(args: Subset<T, RepairLogAggregateArgs>): Prisma.PrismaPromise<GetRepairLogAggregateType<T>>

    /**
     * Group by RepairLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairLogGroupByArgs['orderBy'] }
        : { orderBy?: RepairLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepairLog model
   */
  readonly fields: RepairLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepairLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    repair<T extends RepairDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepairDefaultArgs<ExtArgs>>): Prisma__RepairClient<$Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the RepairLog model
   */ 
  interface RepairLogFieldRefs {
    readonly id: FieldRef<"RepairLog", 'String'>
    readonly repairId: FieldRef<"RepairLog", 'String'>
    readonly status: FieldRef<"RepairLog", 'String'>
    readonly comment: FieldRef<"RepairLog", 'String'>
    readonly createdAt: FieldRef<"RepairLog", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * RepairLog findUnique
   */
  export type RepairLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * Filter, which RepairLog to fetch.
     */
    where: RepairLogWhereUniqueInput
  }


  /**
   * RepairLog findUniqueOrThrow
   */
  export type RepairLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * Filter, which RepairLog to fetch.
     */
    where: RepairLogWhereUniqueInput
  }


  /**
   * RepairLog findFirst
   */
  export type RepairLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * Filter, which RepairLog to fetch.
     */
    where?: RepairLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairLogs to fetch.
     */
    orderBy?: RepairLogOrderByWithRelationInput | RepairLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairLogs.
     */
    cursor?: RepairLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairLogs.
     */
    distinct?: RepairLogScalarFieldEnum | RepairLogScalarFieldEnum[]
  }


  /**
   * RepairLog findFirstOrThrow
   */
  export type RepairLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * Filter, which RepairLog to fetch.
     */
    where?: RepairLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairLogs to fetch.
     */
    orderBy?: RepairLogOrderByWithRelationInput | RepairLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairLogs.
     */
    cursor?: RepairLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairLogs.
     */
    distinct?: RepairLogScalarFieldEnum | RepairLogScalarFieldEnum[]
  }


  /**
   * RepairLog findMany
   */
  export type RepairLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * Filter, which RepairLogs to fetch.
     */
    where?: RepairLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairLogs to fetch.
     */
    orderBy?: RepairLogOrderByWithRelationInput | RepairLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepairLogs.
     */
    cursor?: RepairLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairLogs.
     */
    skip?: number
    distinct?: RepairLogScalarFieldEnum | RepairLogScalarFieldEnum[]
  }


  /**
   * RepairLog create
   */
  export type RepairLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * The data needed to create a RepairLog.
     */
    data: XOR<RepairLogCreateInput, RepairLogUncheckedCreateInput>
  }


  /**
   * RepairLog update
   */
  export type RepairLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * The data needed to update a RepairLog.
     */
    data: XOR<RepairLogUpdateInput, RepairLogUncheckedUpdateInput>
    /**
     * Choose, which RepairLog to update.
     */
    where: RepairLogWhereUniqueInput
  }


  /**
   * RepairLog updateMany
   */
  export type RepairLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairLogs.
     */
    data: XOR<RepairLogUpdateManyMutationInput, RepairLogUncheckedUpdateManyInput>
    /**
     * Filter which RepairLogs to update
     */
    where?: RepairLogWhereInput
  }


  /**
   * RepairLog upsert
   */
  export type RepairLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * The filter to search for the RepairLog to update in case it exists.
     */
    where: RepairLogWhereUniqueInput
    /**
     * In case the RepairLog found by the `where` argument doesn't exist, create a new RepairLog with this data.
     */
    create: XOR<RepairLogCreateInput, RepairLogUncheckedCreateInput>
    /**
     * In case the RepairLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairLogUpdateInput, RepairLogUncheckedUpdateInput>
  }


  /**
   * RepairLog delete
   */
  export type RepairLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
    /**
     * Filter which RepairLog to delete.
     */
    where: RepairLogWhereUniqueInput
  }


  /**
   * RepairLog deleteMany
   */
  export type RepairLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairLogs to delete
     */
    where?: RepairLogWhereInput
  }


  /**
   * RepairLog without action
   */
  export type RepairLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairLog
     */
    select?: RepairLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RepairLogInclude<ExtArgs> | null
  }



  /**
   * Model ShopProduct
   */

  export type AggregateShopProduct = {
    _count: ShopProductCountAggregateOutputType | null
    _avg: ShopProductAvgAggregateOutputType | null
    _sum: ShopProductSumAggregateOutputType | null
    _min: ShopProductMinAggregateOutputType | null
    _max: ShopProductMaxAggregateOutputType | null
  }

  export type ShopProductAvgAggregateOutputType = {
    purchasePrice: number | null
    sellingPrice: number | null
    stock: number | null
    minStock: number | null
  }

  export type ShopProductSumAggregateOutputType = {
    purchasePrice: number | null
    sellingPrice: number | null
    stock: number | null
    minStock: number | null
  }

  export type ShopProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    sku: string | null
    barcode: string | null
    purchasePrice: number | null
    sellingPrice: number | null
    stock: number | null
    minStock: number | null
    supplier: string | null
    description: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    sku: string | null
    barcode: string | null
    purchasePrice: number | null
    sellingPrice: number | null
    stock: number | null
    minStock: number | null
    supplier: string | null
    description: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopProductCountAggregateOutputType = {
    id: number
    name: number
    category: number
    sku: number
    barcode: number
    purchasePrice: number
    sellingPrice: number
    stock: number
    minStock: number
    supplier: number
    description: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopProductAvgAggregateInputType = {
    purchasePrice?: true
    sellingPrice?: true
    stock?: true
    minStock?: true
  }

  export type ShopProductSumAggregateInputType = {
    purchasePrice?: true
    sellingPrice?: true
    stock?: true
    minStock?: true
  }

  export type ShopProductMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    sku?: true
    barcode?: true
    purchasePrice?: true
    sellingPrice?: true
    stock?: true
    minStock?: true
    supplier?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopProductMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    sku?: true
    barcode?: true
    purchasePrice?: true
    sellingPrice?: true
    stock?: true
    minStock?: true
    supplier?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopProductCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    sku?: true
    barcode?: true
    purchasePrice?: true
    sellingPrice?: true
    stock?: true
    minStock?: true
    supplier?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopProduct to aggregate.
     */
    where?: ShopProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopProducts to fetch.
     */
    orderBy?: ShopProductOrderByWithRelationInput | ShopProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopProducts
    **/
    _count?: true | ShopProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopProductMaxAggregateInputType
  }

  export type GetShopProductAggregateType<T extends ShopProductAggregateArgs> = {
        [P in keyof T & keyof AggregateShopProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopProduct[P]>
      : GetScalarType<T[P], AggregateShopProduct[P]>
  }




  export type ShopProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopProductWhereInput
    orderBy?: ShopProductOrderByWithAggregationInput | ShopProductOrderByWithAggregationInput[]
    by: ShopProductScalarFieldEnum[] | ShopProductScalarFieldEnum
    having?: ShopProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopProductCountAggregateInputType | true
    _avg?: ShopProductAvgAggregateInputType
    _sum?: ShopProductSumAggregateInputType
    _min?: ShopProductMinAggregateInputType
    _max?: ShopProductMaxAggregateInputType
  }

  export type ShopProductGroupByOutputType = {
    id: string
    name: string
    category: string
    sku: string | null
    barcode: string | null
    purchasePrice: number
    sellingPrice: number
    stock: number
    minStock: number
    supplier: string | null
    description: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ShopProductCountAggregateOutputType | null
    _avg: ShopProductAvgAggregateOutputType | null
    _sum: ShopProductSumAggregateOutputType | null
    _min: ShopProductMinAggregateOutputType | null
    _max: ShopProductMaxAggregateOutputType | null
  }

  type GetShopProductGroupByPayload<T extends ShopProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopProductGroupByOutputType[P]>
            : GetScalarType<T[P], ShopProductGroupByOutputType[P]>
        }
      >
    >


  export type ShopProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    sku?: boolean
    barcode?: boolean
    purchasePrice?: boolean
    sellingPrice?: boolean
    stock?: boolean
    minStock?: boolean
    supplier?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shopProduct"]>

  export type ShopProductSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    sku?: boolean
    barcode?: boolean
    purchasePrice?: boolean
    sellingPrice?: boolean
    stock?: boolean
    minStock?: boolean
    supplier?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ShopProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopProduct"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      sku: string | null
      barcode: string | null
      purchasePrice: number
      sellingPrice: number
      stock: number
      minStock: number
      supplier: string | null
      description: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shopProduct"]>
    composites: {}
  }


  type ShopProductGetPayload<S extends boolean | null | undefined | ShopProductDefaultArgs> = $Result.GetResult<Prisma.$ShopProductPayload, S>

  type ShopProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShopProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShopProductCountAggregateInputType | true
    }

  export interface ShopProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopProduct'], meta: { name: 'ShopProduct' } }
    /**
     * Find zero or one ShopProduct that matches the filter.
     * @param {ShopProductFindUniqueArgs} args - Arguments to find a ShopProduct
     * @example
     * // Get one ShopProduct
     * const shopProduct = await prisma.shopProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ShopProductFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ShopProductFindUniqueArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ShopProduct that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ShopProductFindUniqueOrThrowArgs} args - Arguments to find a ShopProduct
     * @example
     * // Get one ShopProduct
     * const shopProduct = await prisma.shopProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ShopProductFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ShopProductFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ShopProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopProductFindFirstArgs} args - Arguments to find a ShopProduct
     * @example
     * // Get one ShopProduct
     * const shopProduct = await prisma.shopProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ShopProductFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ShopProductFindFirstArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ShopProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopProductFindFirstOrThrowArgs} args - Arguments to find a ShopProduct
     * @example
     * // Get one ShopProduct
     * const shopProduct = await prisma.shopProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ShopProductFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ShopProductFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ShopProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopProductFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopProducts
     * const shopProducts = await prisma.shopProduct.findMany()
     * 
     * // Get first 10 ShopProducts
     * const shopProducts = await prisma.shopProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopProductWithIdOnly = await prisma.shopProduct.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ShopProductFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ShopProductFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ShopProduct.
     * @param {ShopProductCreateArgs} args - Arguments to create a ShopProduct.
     * @example
     * // Create one ShopProduct
     * const ShopProduct = await prisma.shopProduct.create({
     *   data: {
     *     // ... data to create a ShopProduct
     *   }
     * })
     * 
    **/
    create<T extends ShopProductCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ShopProductCreateArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a ShopProduct.
     * @param {ShopProductDeleteArgs} args - Arguments to delete one ShopProduct.
     * @example
     * // Delete one ShopProduct
     * const ShopProduct = await prisma.shopProduct.delete({
     *   where: {
     *     // ... filter to delete one ShopProduct
     *   }
     * })
     * 
    **/
    delete<T extends ShopProductDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ShopProductDeleteArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ShopProduct.
     * @param {ShopProductUpdateArgs} args - Arguments to update one ShopProduct.
     * @example
     * // Update one ShopProduct
     * const shopProduct = await prisma.shopProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ShopProductUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ShopProductUpdateArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ShopProducts.
     * @param {ShopProductDeleteManyArgs} args - Arguments to filter ShopProducts to delete.
     * @example
     * // Delete a few ShopProducts
     * const { count } = await prisma.shopProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ShopProductDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ShopProductDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopProducts
     * const shopProduct = await prisma.shopProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ShopProductUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ShopProductUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ShopProduct.
     * @param {ShopProductUpsertArgs} args - Arguments to update or create a ShopProduct.
     * @example
     * // Update or create a ShopProduct
     * const shopProduct = await prisma.shopProduct.upsert({
     *   create: {
     *     // ... data to create a ShopProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopProduct we want to update
     *   }
     * })
    **/
    upsert<T extends ShopProductUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ShopProductUpsertArgs<ExtArgs>>
    ): Prisma__ShopProductClient<$Result.GetResult<Prisma.$ShopProductPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ShopProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopProductCountArgs} args - Arguments to filter ShopProducts to count.
     * @example
     * // Count the number of ShopProducts
     * const count = await prisma.shopProduct.count({
     *   where: {
     *     // ... the filter for the ShopProducts we want to count
     *   }
     * })
    **/
    count<T extends ShopProductCountArgs>(
      args?: Subset<T, ShopProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopProductAggregateArgs>(args: Subset<T, ShopProductAggregateArgs>): Prisma.PrismaPromise<GetShopProductAggregateType<T>>

    /**
     * Group by ShopProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopProductGroupByArgs['orderBy'] }
        : { orderBy?: ShopProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopProduct model
   */
  readonly fields: ShopProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ShopProduct model
   */ 
  interface ShopProductFieldRefs {
    readonly id: FieldRef<"ShopProduct", 'String'>
    readonly name: FieldRef<"ShopProduct", 'String'>
    readonly category: FieldRef<"ShopProduct", 'String'>
    readonly sku: FieldRef<"ShopProduct", 'String'>
    readonly barcode: FieldRef<"ShopProduct", 'String'>
    readonly purchasePrice: FieldRef<"ShopProduct", 'Float'>
    readonly sellingPrice: FieldRef<"ShopProduct", 'Float'>
    readonly stock: FieldRef<"ShopProduct", 'Int'>
    readonly minStock: FieldRef<"ShopProduct", 'Int'>
    readonly supplier: FieldRef<"ShopProduct", 'String'>
    readonly description: FieldRef<"ShopProduct", 'String'>
    readonly imageUrl: FieldRef<"ShopProduct", 'String'>
    readonly createdAt: FieldRef<"ShopProduct", 'DateTime'>
    readonly updatedAt: FieldRef<"ShopProduct", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ShopProduct findUnique
   */
  export type ShopProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * Filter, which ShopProduct to fetch.
     */
    where: ShopProductWhereUniqueInput
  }


  /**
   * ShopProduct findUniqueOrThrow
   */
  export type ShopProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * Filter, which ShopProduct to fetch.
     */
    where: ShopProductWhereUniqueInput
  }


  /**
   * ShopProduct findFirst
   */
  export type ShopProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * Filter, which ShopProduct to fetch.
     */
    where?: ShopProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopProducts to fetch.
     */
    orderBy?: ShopProductOrderByWithRelationInput | ShopProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopProducts.
     */
    cursor?: ShopProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopProducts.
     */
    distinct?: ShopProductScalarFieldEnum | ShopProductScalarFieldEnum[]
  }


  /**
   * ShopProduct findFirstOrThrow
   */
  export type ShopProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * Filter, which ShopProduct to fetch.
     */
    where?: ShopProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopProducts to fetch.
     */
    orderBy?: ShopProductOrderByWithRelationInput | ShopProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopProducts.
     */
    cursor?: ShopProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopProducts.
     */
    distinct?: ShopProductScalarFieldEnum | ShopProductScalarFieldEnum[]
  }


  /**
   * ShopProduct findMany
   */
  export type ShopProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * Filter, which ShopProducts to fetch.
     */
    where?: ShopProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopProducts to fetch.
     */
    orderBy?: ShopProductOrderByWithRelationInput | ShopProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopProducts.
     */
    cursor?: ShopProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopProducts.
     */
    skip?: number
    distinct?: ShopProductScalarFieldEnum | ShopProductScalarFieldEnum[]
  }


  /**
   * ShopProduct create
   */
  export type ShopProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * The data needed to create a ShopProduct.
     */
    data: XOR<ShopProductCreateInput, ShopProductUncheckedCreateInput>
  }


  /**
   * ShopProduct update
   */
  export type ShopProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * The data needed to update a ShopProduct.
     */
    data: XOR<ShopProductUpdateInput, ShopProductUncheckedUpdateInput>
    /**
     * Choose, which ShopProduct to update.
     */
    where: ShopProductWhereUniqueInput
  }


  /**
   * ShopProduct updateMany
   */
  export type ShopProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopProducts.
     */
    data: XOR<ShopProductUpdateManyMutationInput, ShopProductUncheckedUpdateManyInput>
    /**
     * Filter which ShopProducts to update
     */
    where?: ShopProductWhereInput
  }


  /**
   * ShopProduct upsert
   */
  export type ShopProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * The filter to search for the ShopProduct to update in case it exists.
     */
    where: ShopProductWhereUniqueInput
    /**
     * In case the ShopProduct found by the `where` argument doesn't exist, create a new ShopProduct with this data.
     */
    create: XOR<ShopProductCreateInput, ShopProductUncheckedCreateInput>
    /**
     * In case the ShopProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopProductUpdateInput, ShopProductUncheckedUpdateInput>
  }


  /**
   * ShopProduct delete
   */
  export type ShopProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
    /**
     * Filter which ShopProduct to delete.
     */
    where: ShopProductWhereUniqueInput
  }


  /**
   * ShopProduct deleteMany
   */
  export type ShopProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopProducts to delete
     */
    where?: ShopProductWhereInput
  }


  /**
   * ShopProduct without action
   */
  export type ShopProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopProduct
     */
    select?: ShopProductSelect<ExtArgs> | null
  }



  /**
   * Model WorkshopSettings
   */

  export type AggregateWorkshopSettings = {
    _count: WorkshopSettingsCountAggregateOutputType | null
    _min: WorkshopSettingsMinAggregateOutputType | null
    _max: WorkshopSettingsMaxAggregateOutputType | null
  }

  export type WorkshopSettingsMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    countryCode: string | null
    phone: string | null
    email: string | null
    siret: string | null
    vatNumber: string | null
    legalForm: string | null
    capital: string | null
    rcs: string | null
    iban: string | null
    bic: string | null
    updatedAt: Date | null
  }

  export type WorkshopSettingsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    countryCode: string | null
    phone: string | null
    email: string | null
    siret: string | null
    vatNumber: string | null
    legalForm: string | null
    capital: string | null
    rcs: string | null
    iban: string | null
    bic: string | null
    updatedAt: Date | null
  }

  export type WorkshopSettingsCountAggregateOutputType = {
    id: number
    name: number
    address: number
    zipCode: number
    city: number
    countryCode: number
    phone: number
    email: number
    siret: number
    vatNumber: number
    legalForm: number
    capital: number
    rcs: number
    iban: number
    bic: number
    updatedAt: number
    _all: number
  }


  export type WorkshopSettingsMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    zipCode?: true
    city?: true
    countryCode?: true
    phone?: true
    email?: true
    siret?: true
    vatNumber?: true
    legalForm?: true
    capital?: true
    rcs?: true
    iban?: true
    bic?: true
    updatedAt?: true
  }

  export type WorkshopSettingsMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    zipCode?: true
    city?: true
    countryCode?: true
    phone?: true
    email?: true
    siret?: true
    vatNumber?: true
    legalForm?: true
    capital?: true
    rcs?: true
    iban?: true
    bic?: true
    updatedAt?: true
  }

  export type WorkshopSettingsCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    zipCode?: true
    city?: true
    countryCode?: true
    phone?: true
    email?: true
    siret?: true
    vatNumber?: true
    legalForm?: true
    capital?: true
    rcs?: true
    iban?: true
    bic?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkshopSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkshopSettings to aggregate.
     */
    where?: WorkshopSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkshopSettings to fetch.
     */
    orderBy?: WorkshopSettingsOrderByWithRelationInput | WorkshopSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkshopSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkshopSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkshopSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkshopSettings
    **/
    _count?: true | WorkshopSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkshopSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkshopSettingsMaxAggregateInputType
  }

  export type GetWorkshopSettingsAggregateType<T extends WorkshopSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkshopSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkshopSettings[P]>
      : GetScalarType<T[P], AggregateWorkshopSettings[P]>
  }




  export type WorkshopSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkshopSettingsWhereInput
    orderBy?: WorkshopSettingsOrderByWithAggregationInput | WorkshopSettingsOrderByWithAggregationInput[]
    by: WorkshopSettingsScalarFieldEnum[] | WorkshopSettingsScalarFieldEnum
    having?: WorkshopSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkshopSettingsCountAggregateInputType | true
    _min?: WorkshopSettingsMinAggregateInputType
    _max?: WorkshopSettingsMaxAggregateInputType
  }

  export type WorkshopSettingsGroupByOutputType = {
    id: string
    name: string
    address: string
    zipCode: string
    city: string
    countryCode: string
    phone: string
    email: string
    siret: string
    vatNumber: string
    legalForm: string
    capital: string
    rcs: string
    iban: string | null
    bic: string | null
    updatedAt: Date
    _count: WorkshopSettingsCountAggregateOutputType | null
    _min: WorkshopSettingsMinAggregateOutputType | null
    _max: WorkshopSettingsMaxAggregateOutputType | null
  }

  type GetWorkshopSettingsGroupByPayload<T extends WorkshopSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkshopSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkshopSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkshopSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], WorkshopSettingsGroupByOutputType[P]>
        }
      >
    >


  export type WorkshopSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    zipCode?: boolean
    city?: boolean
    countryCode?: boolean
    phone?: boolean
    email?: boolean
    siret?: boolean
    vatNumber?: boolean
    legalForm?: boolean
    capital?: boolean
    rcs?: boolean
    iban?: boolean
    bic?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workshopSettings"]>

  export type WorkshopSettingsSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    zipCode?: boolean
    city?: boolean
    countryCode?: boolean
    phone?: boolean
    email?: boolean
    siret?: boolean
    vatNumber?: boolean
    legalForm?: boolean
    capital?: boolean
    rcs?: boolean
    iban?: boolean
    bic?: boolean
    updatedAt?: boolean
  }


  export type $WorkshopSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkshopSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      zipCode: string
      city: string
      countryCode: string
      phone: string
      email: string
      siret: string
      vatNumber: string
      legalForm: string
      capital: string
      rcs: string
      iban: string | null
      bic: string | null
      updatedAt: Date
    }, ExtArgs["result"]["workshopSettings"]>
    composites: {}
  }


  type WorkshopSettingsGetPayload<S extends boolean | null | undefined | WorkshopSettingsDefaultArgs> = $Result.GetResult<Prisma.$WorkshopSettingsPayload, S>

  type WorkshopSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkshopSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkshopSettingsCountAggregateInputType | true
    }

  export interface WorkshopSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkshopSettings'], meta: { name: 'WorkshopSettings' } }
    /**
     * Find zero or one WorkshopSettings that matches the filter.
     * @param {WorkshopSettingsFindUniqueArgs} args - Arguments to find a WorkshopSettings
     * @example
     * // Get one WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WorkshopSettingsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, WorkshopSettingsFindUniqueArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one WorkshopSettings that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WorkshopSettingsFindUniqueOrThrowArgs} args - Arguments to find a WorkshopSettings
     * @example
     * // Get one WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WorkshopSettingsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkshopSettingsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first WorkshopSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkshopSettingsFindFirstArgs} args - Arguments to find a WorkshopSettings
     * @example
     * // Get one WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WorkshopSettingsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkshopSettingsFindFirstArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first WorkshopSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkshopSettingsFindFirstOrThrowArgs} args - Arguments to find a WorkshopSettings
     * @example
     * // Get one WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WorkshopSettingsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkshopSettingsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more WorkshopSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkshopSettingsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.findMany()
     * 
     * // Get first 10 WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workshopSettingsWithIdOnly = await prisma.workshopSettings.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WorkshopSettingsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkshopSettingsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a WorkshopSettings.
     * @param {WorkshopSettingsCreateArgs} args - Arguments to create a WorkshopSettings.
     * @example
     * // Create one WorkshopSettings
     * const WorkshopSettings = await prisma.workshopSettings.create({
     *   data: {
     *     // ... data to create a WorkshopSettings
     *   }
     * })
     * 
    **/
    create<T extends WorkshopSettingsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WorkshopSettingsCreateArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a WorkshopSettings.
     * @param {WorkshopSettingsDeleteArgs} args - Arguments to delete one WorkshopSettings.
     * @example
     * // Delete one WorkshopSettings
     * const WorkshopSettings = await prisma.workshopSettings.delete({
     *   where: {
     *     // ... filter to delete one WorkshopSettings
     *   }
     * })
     * 
    **/
    delete<T extends WorkshopSettingsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WorkshopSettingsDeleteArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one WorkshopSettings.
     * @param {WorkshopSettingsUpdateArgs} args - Arguments to update one WorkshopSettings.
     * @example
     * // Update one WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WorkshopSettingsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WorkshopSettingsUpdateArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more WorkshopSettings.
     * @param {WorkshopSettingsDeleteManyArgs} args - Arguments to filter WorkshopSettings to delete.
     * @example
     * // Delete a few WorkshopSettings
     * const { count } = await prisma.workshopSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WorkshopSettingsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkshopSettingsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkshopSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkshopSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WorkshopSettingsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WorkshopSettingsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkshopSettings.
     * @param {WorkshopSettingsUpsertArgs} args - Arguments to update or create a WorkshopSettings.
     * @example
     * // Update or create a WorkshopSettings
     * const workshopSettings = await prisma.workshopSettings.upsert({
     *   create: {
     *     // ... data to create a WorkshopSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkshopSettings we want to update
     *   }
     * })
    **/
    upsert<T extends WorkshopSettingsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WorkshopSettingsUpsertArgs<ExtArgs>>
    ): Prisma__WorkshopSettingsClient<$Result.GetResult<Prisma.$WorkshopSettingsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of WorkshopSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkshopSettingsCountArgs} args - Arguments to filter WorkshopSettings to count.
     * @example
     * // Count the number of WorkshopSettings
     * const count = await prisma.workshopSettings.count({
     *   where: {
     *     // ... the filter for the WorkshopSettings we want to count
     *   }
     * })
    **/
    count<T extends WorkshopSettingsCountArgs>(
      args?: Subset<T, WorkshopSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkshopSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkshopSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkshopSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkshopSettingsAggregateArgs>(args: Subset<T, WorkshopSettingsAggregateArgs>): Prisma.PrismaPromise<GetWorkshopSettingsAggregateType<T>>

    /**
     * Group by WorkshopSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkshopSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkshopSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkshopSettingsGroupByArgs['orderBy'] }
        : { orderBy?: WorkshopSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkshopSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkshopSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkshopSettings model
   */
  readonly fields: WorkshopSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkshopSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkshopSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the WorkshopSettings model
   */ 
  interface WorkshopSettingsFieldRefs {
    readonly id: FieldRef<"WorkshopSettings", 'String'>
    readonly name: FieldRef<"WorkshopSettings", 'String'>
    readonly address: FieldRef<"WorkshopSettings", 'String'>
    readonly zipCode: FieldRef<"WorkshopSettings", 'String'>
    readonly city: FieldRef<"WorkshopSettings", 'String'>
    readonly countryCode: FieldRef<"WorkshopSettings", 'String'>
    readonly phone: FieldRef<"WorkshopSettings", 'String'>
    readonly email: FieldRef<"WorkshopSettings", 'String'>
    readonly siret: FieldRef<"WorkshopSettings", 'String'>
    readonly vatNumber: FieldRef<"WorkshopSettings", 'String'>
    readonly legalForm: FieldRef<"WorkshopSettings", 'String'>
    readonly capital: FieldRef<"WorkshopSettings", 'String'>
    readonly rcs: FieldRef<"WorkshopSettings", 'String'>
    readonly iban: FieldRef<"WorkshopSettings", 'String'>
    readonly bic: FieldRef<"WorkshopSettings", 'String'>
    readonly updatedAt: FieldRef<"WorkshopSettings", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * WorkshopSettings findUnique
   */
  export type WorkshopSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * Filter, which WorkshopSettings to fetch.
     */
    where: WorkshopSettingsWhereUniqueInput
  }


  /**
   * WorkshopSettings findUniqueOrThrow
   */
  export type WorkshopSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * Filter, which WorkshopSettings to fetch.
     */
    where: WorkshopSettingsWhereUniqueInput
  }


  /**
   * WorkshopSettings findFirst
   */
  export type WorkshopSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * Filter, which WorkshopSettings to fetch.
     */
    where?: WorkshopSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkshopSettings to fetch.
     */
    orderBy?: WorkshopSettingsOrderByWithRelationInput | WorkshopSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkshopSettings.
     */
    cursor?: WorkshopSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkshopSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkshopSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkshopSettings.
     */
    distinct?: WorkshopSettingsScalarFieldEnum | WorkshopSettingsScalarFieldEnum[]
  }


  /**
   * WorkshopSettings findFirstOrThrow
   */
  export type WorkshopSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * Filter, which WorkshopSettings to fetch.
     */
    where?: WorkshopSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkshopSettings to fetch.
     */
    orderBy?: WorkshopSettingsOrderByWithRelationInput | WorkshopSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkshopSettings.
     */
    cursor?: WorkshopSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkshopSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkshopSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkshopSettings.
     */
    distinct?: WorkshopSettingsScalarFieldEnum | WorkshopSettingsScalarFieldEnum[]
  }


  /**
   * WorkshopSettings findMany
   */
  export type WorkshopSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * Filter, which WorkshopSettings to fetch.
     */
    where?: WorkshopSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkshopSettings to fetch.
     */
    orderBy?: WorkshopSettingsOrderByWithRelationInput | WorkshopSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkshopSettings.
     */
    cursor?: WorkshopSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkshopSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkshopSettings.
     */
    skip?: number
    distinct?: WorkshopSettingsScalarFieldEnum | WorkshopSettingsScalarFieldEnum[]
  }


  /**
   * WorkshopSettings create
   */
  export type WorkshopSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a WorkshopSettings.
     */
    data: XOR<WorkshopSettingsCreateInput, WorkshopSettingsUncheckedCreateInput>
  }


  /**
   * WorkshopSettings update
   */
  export type WorkshopSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a WorkshopSettings.
     */
    data: XOR<WorkshopSettingsUpdateInput, WorkshopSettingsUncheckedUpdateInput>
    /**
     * Choose, which WorkshopSettings to update.
     */
    where: WorkshopSettingsWhereUniqueInput
  }


  /**
   * WorkshopSettings updateMany
   */
  export type WorkshopSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkshopSettings.
     */
    data: XOR<WorkshopSettingsUpdateManyMutationInput, WorkshopSettingsUncheckedUpdateManyInput>
    /**
     * Filter which WorkshopSettings to update
     */
    where?: WorkshopSettingsWhereInput
  }


  /**
   * WorkshopSettings upsert
   */
  export type WorkshopSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the WorkshopSettings to update in case it exists.
     */
    where: WorkshopSettingsWhereUniqueInput
    /**
     * In case the WorkshopSettings found by the `where` argument doesn't exist, create a new WorkshopSettings with this data.
     */
    create: XOR<WorkshopSettingsCreateInput, WorkshopSettingsUncheckedCreateInput>
    /**
     * In case the WorkshopSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkshopSettingsUpdateInput, WorkshopSettingsUncheckedUpdateInput>
  }


  /**
   * WorkshopSettings delete
   */
  export type WorkshopSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
    /**
     * Filter which WorkshopSettings to delete.
     */
    where: WorkshopSettingsWhereUniqueInput
  }


  /**
   * WorkshopSettings deleteMany
   */
  export type WorkshopSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkshopSettings to delete
     */
    where?: WorkshopSettingsWhereInput
  }


  /**
   * WorkshopSettings without action
   */
  export type WorkshopSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkshopSettings
     */
    select?: WorkshopSettingsSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    firstName: 'firstName',
    lastName: 'lastName',
    clientType: 'clientType',
    email: 'email',
    phone: 'phone',
    address: 'address',
    zipCode: 'zipCode',
    city: 'city',
    createdAt: 'createdAt',
    siret: 'siret',
    vatNumber: 'vatNumber'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const QuoteScalarFieldEnum: {
    id: 'id',
    number: 'number',
    status: 'status',
    clientId: 'clientId',
    repairId: 'repairId',
    items: 'items',
    totalHT: 'totalHT',
    totalTTC: 'totalTTC',
    notes: 'notes',
    validUntil: 'validUntil',
    invoiceId: 'invoiceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    taxDetails: 'taxDetails'
  };

  export type QuoteScalarFieldEnum = (typeof QuoteScalarFieldEnum)[keyof typeof QuoteScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    number: 'number',
    clientId: 'clientId',
    repairId: 'repairId',
    items: 'items',
    totalHT: 'totalHT',
    totalTTC: 'totalTTC',
    notes: 'notes',
    paid: 'paid',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    taxDetails: 'taxDetails'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const DeviceTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type DeviceTypeScalarFieldEnum = (typeof DeviceTypeScalarFieldEnum)[keyof typeof DeviceTypeScalarFieldEnum]


  export const DeviceBrandScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type DeviceBrandScalarFieldEnum = (typeof DeviceBrandScalarFieldEnum)[keyof typeof DeviceBrandScalarFieldEnum]


  export const DeviceModelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    brandId: 'brandId',
    typeId: 'typeId',
    createdAt: 'createdAt',
    modelReference: 'modelReference'
  };

  export type DeviceModelScalarFieldEnum = (typeof DeviceModelScalarFieldEnum)[keyof typeof DeviceModelScalarFieldEnum]


  export const PartScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sku: 'sku',
    costPrice: 'costPrice',
    stock: 'stock',
    minStock: 'minStock',
    supplier: 'supplier',
    supplierRef: 'supplierRef',
    location: 'location',
    description: 'description',
    modelId: 'modelId',
    createdAt: 'createdAt',
    quality: 'quality'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    laborCost: 'laborCost',
    suggestedPrice: 'suggestedPrice',
    duration: 'duration',
    partId: 'partId',
    modelId: 'modelId',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const RepairScalarFieldEnum: {
    id: 'id',
    status: 'status',
    partStatus: 'partStatus',
    clientId: 'clientId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RepairScalarFieldEnum = (typeof RepairScalarFieldEnum)[keyof typeof RepairScalarFieldEnum]


  export const RepairServiceScalarFieldEnum: {
    id: 'id',
    repairId: 'repairId',
    serviceId: 'serviceId',
    quantity: 'quantity',
    priceAtTime: 'priceAtTime'
  };

  export type RepairServiceScalarFieldEnum = (typeof RepairServiceScalarFieldEnum)[keyof typeof RepairServiceScalarFieldEnum]


  export const RepairLogScalarFieldEnum: {
    id: 'id',
    repairId: 'repairId',
    status: 'status',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type RepairLogScalarFieldEnum = (typeof RepairLogScalarFieldEnum)[keyof typeof RepairLogScalarFieldEnum]


  export const ShopProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    sku: 'sku',
    barcode: 'barcode',
    purchasePrice: 'purchasePrice',
    sellingPrice: 'sellingPrice',
    stock: 'stock',
    minStock: 'minStock',
    supplier: 'supplier',
    description: 'description',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopProductScalarFieldEnum = (typeof ShopProductScalarFieldEnum)[keyof typeof ShopProductScalarFieldEnum]


  export const WorkshopSettingsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    zipCode: 'zipCode',
    city: 'city',
    countryCode: 'countryCode',
    phone: 'phone',
    email: 'email',
    siret: 'siret',
    vatNumber: 'vatNumber',
    legalForm: 'legalForm',
    capital: 'capital',
    rcs: 'rcs',
    iban: 'iban',
    bic: 'bic',
    updatedAt: 'updatedAt'
  };

  export type WorkshopSettingsScalarFieldEnum = (typeof WorkshopSettingsScalarFieldEnum)[keyof typeof WorkshopSettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    firstName?: StringNullableFilter<"Client"> | string | null
    lastName?: StringNullableFilter<"Client"> | string | null
    clientType?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    phone?: StringFilter<"Client"> | string
    address?: StringNullableFilter<"Client"> | string | null
    zipCode?: StringNullableFilter<"Client"> | string | null
    city?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    siret?: StringNullableFilter<"Client"> | string | null
    vatNumber?: StringNullableFilter<"Client"> | string | null
    invoices?: InvoiceListRelationFilter
    quotes?: QuoteListRelationFilter
    repairs?: RepairListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    clientType?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrder
    address?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    siret?: SortOrderInput | SortOrder
    vatNumber?: SortOrderInput | SortOrder
    invoices?: InvoiceOrderByRelationAggregateInput
    quotes?: QuoteOrderByRelationAggregateInput
    repairs?: RepairOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    firstName?: StringNullableFilter<"Client"> | string | null
    lastName?: StringNullableFilter<"Client"> | string | null
    clientType?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    phone?: StringFilter<"Client"> | string
    address?: StringNullableFilter<"Client"> | string | null
    zipCode?: StringNullableFilter<"Client"> | string | null
    city?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    siret?: StringNullableFilter<"Client"> | string | null
    vatNumber?: StringNullableFilter<"Client"> | string | null
    invoices?: InvoiceListRelationFilter
    quotes?: QuoteListRelationFilter
    repairs?: RepairListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    clientType?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrder
    address?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    siret?: SortOrderInput | SortOrder
    vatNumber?: SortOrderInput | SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    firstName?: StringNullableWithAggregatesFilter<"Client"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Client"> | string | null
    clientType?: StringWithAggregatesFilter<"Client"> | string
    email?: StringNullableWithAggregatesFilter<"Client"> | string | null
    phone?: StringWithAggregatesFilter<"Client"> | string
    address?: StringNullableWithAggregatesFilter<"Client"> | string | null
    zipCode?: StringNullableWithAggregatesFilter<"Client"> | string | null
    city?: StringNullableWithAggregatesFilter<"Client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    siret?: StringNullableWithAggregatesFilter<"Client"> | string | null
    vatNumber?: StringNullableWithAggregatesFilter<"Client"> | string | null
  }

  export type QuoteWhereInput = {
    AND?: QuoteWhereInput | QuoteWhereInput[]
    OR?: QuoteWhereInput[]
    NOT?: QuoteWhereInput | QuoteWhereInput[]
    id?: StringFilter<"Quote"> | string
    number?: StringFilter<"Quote"> | string
    status?: StringFilter<"Quote"> | string
    clientId?: StringFilter<"Quote"> | string
    repairId?: StringNullableFilter<"Quote"> | string | null
    items?: StringFilter<"Quote"> | string
    totalHT?: FloatFilter<"Quote"> | number
    totalTTC?: FloatFilter<"Quote"> | number
    notes?: StringNullableFilter<"Quote"> | string | null
    validUntil?: DateTimeNullableFilter<"Quote"> | Date | string | null
    invoiceId?: StringNullableFilter<"Quote"> | string | null
    createdAt?: DateTimeFilter<"Quote"> | Date | string
    updatedAt?: DateTimeFilter<"Quote"> | Date | string
    taxDetails?: StringNullableFilter<"Quote"> | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    repair?: XOR<RepairNullableRelationFilter, RepairWhereInput> | null
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
  }

  export type QuoteOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrderInput | SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrderInput | SortOrder
    validUntil?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrderInput | SortOrder
    client?: ClientOrderByWithRelationInput
    repair?: RepairOrderByWithRelationInput
    invoice?: InvoiceOrderByWithRelationInput
  }

  export type QuoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    number?: string
    invoiceId?: string
    AND?: QuoteWhereInput | QuoteWhereInput[]
    OR?: QuoteWhereInput[]
    NOT?: QuoteWhereInput | QuoteWhereInput[]
    status?: StringFilter<"Quote"> | string
    clientId?: StringFilter<"Quote"> | string
    repairId?: StringNullableFilter<"Quote"> | string | null
    items?: StringFilter<"Quote"> | string
    totalHT?: FloatFilter<"Quote"> | number
    totalTTC?: FloatFilter<"Quote"> | number
    notes?: StringNullableFilter<"Quote"> | string | null
    validUntil?: DateTimeNullableFilter<"Quote"> | Date | string | null
    createdAt?: DateTimeFilter<"Quote"> | Date | string
    updatedAt?: DateTimeFilter<"Quote"> | Date | string
    taxDetails?: StringNullableFilter<"Quote"> | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    repair?: XOR<RepairNullableRelationFilter, RepairWhereInput> | null
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
  }, "id" | "number" | "invoiceId">

  export type QuoteOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrderInput | SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrderInput | SortOrder
    validUntil?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrderInput | SortOrder
    _count?: QuoteCountOrderByAggregateInput
    _avg?: QuoteAvgOrderByAggregateInput
    _max?: QuoteMaxOrderByAggregateInput
    _min?: QuoteMinOrderByAggregateInput
    _sum?: QuoteSumOrderByAggregateInput
  }

  export type QuoteScalarWhereWithAggregatesInput = {
    AND?: QuoteScalarWhereWithAggregatesInput | QuoteScalarWhereWithAggregatesInput[]
    OR?: QuoteScalarWhereWithAggregatesInput[]
    NOT?: QuoteScalarWhereWithAggregatesInput | QuoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quote"> | string
    number?: StringWithAggregatesFilter<"Quote"> | string
    status?: StringWithAggregatesFilter<"Quote"> | string
    clientId?: StringWithAggregatesFilter<"Quote"> | string
    repairId?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    items?: StringWithAggregatesFilter<"Quote"> | string
    totalHT?: FloatWithAggregatesFilter<"Quote"> | number
    totalTTC?: FloatWithAggregatesFilter<"Quote"> | number
    notes?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    validUntil?: DateTimeNullableWithAggregatesFilter<"Quote"> | Date | string | null
    invoiceId?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Quote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Quote"> | Date | string
    taxDetails?: StringNullableWithAggregatesFilter<"Quote"> | string | null
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    number?: StringFilter<"Invoice"> | string
    clientId?: StringFilter<"Invoice"> | string
    repairId?: StringNullableFilter<"Invoice"> | string | null
    items?: StringFilter<"Invoice"> | string
    totalHT?: FloatFilter<"Invoice"> | number
    totalTTC?: FloatFilter<"Invoice"> | number
    notes?: StringNullableFilter<"Invoice"> | string | null
    paid?: BoolFilter<"Invoice"> | boolean
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    taxDetails?: StringNullableFilter<"Invoice"> | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    repair?: XOR<RepairNullableRelationFilter, RepairWhereInput> | null
    quote?: XOR<QuoteNullableRelationFilter, QuoteWhereInput> | null
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrderInput | SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrderInput | SortOrder
    paid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrderInput | SortOrder
    client?: ClientOrderByWithRelationInput
    repair?: RepairOrderByWithRelationInput
    quote?: QuoteOrderByWithRelationInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    number?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    clientId?: StringFilter<"Invoice"> | string
    repairId?: StringNullableFilter<"Invoice"> | string | null
    items?: StringFilter<"Invoice"> | string
    totalHT?: FloatFilter<"Invoice"> | number
    totalTTC?: FloatFilter<"Invoice"> | number
    notes?: StringNullableFilter<"Invoice"> | string | null
    paid?: BoolFilter<"Invoice"> | boolean
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    taxDetails?: StringNullableFilter<"Invoice"> | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    repair?: XOR<RepairNullableRelationFilter, RepairWhereInput> | null
    quote?: XOR<QuoteNullableRelationFilter, QuoteWhereInput> | null
  }, "id" | "number">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrderInput | SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrderInput | SortOrder
    paid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrderInput | SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    number?: StringWithAggregatesFilter<"Invoice"> | string
    clientId?: StringWithAggregatesFilter<"Invoice"> | string
    repairId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    items?: StringWithAggregatesFilter<"Invoice"> | string
    totalHT?: FloatWithAggregatesFilter<"Invoice"> | number
    totalTTC?: FloatWithAggregatesFilter<"Invoice"> | number
    notes?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    paid?: BoolWithAggregatesFilter<"Invoice"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    taxDetails?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
  }

  export type DeviceTypeWhereInput = {
    AND?: DeviceTypeWhereInput | DeviceTypeWhereInput[]
    OR?: DeviceTypeWhereInput[]
    NOT?: DeviceTypeWhereInput | DeviceTypeWhereInput[]
    id?: StringFilter<"DeviceType"> | string
    name?: StringFilter<"DeviceType"> | string
    createdAt?: DateTimeFilter<"DeviceType"> | Date | string
    models?: DeviceModelListRelationFilter
  }

  export type DeviceTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    models?: DeviceModelOrderByRelationAggregateInput
  }

  export type DeviceTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DeviceTypeWhereInput | DeviceTypeWhereInput[]
    OR?: DeviceTypeWhereInput[]
    NOT?: DeviceTypeWhereInput | DeviceTypeWhereInput[]
    createdAt?: DateTimeFilter<"DeviceType"> | Date | string
    models?: DeviceModelListRelationFilter
  }, "id" | "name">

  export type DeviceTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: DeviceTypeCountOrderByAggregateInput
    _max?: DeviceTypeMaxOrderByAggregateInput
    _min?: DeviceTypeMinOrderByAggregateInput
  }

  export type DeviceTypeScalarWhereWithAggregatesInput = {
    AND?: DeviceTypeScalarWhereWithAggregatesInput | DeviceTypeScalarWhereWithAggregatesInput[]
    OR?: DeviceTypeScalarWhereWithAggregatesInput[]
    NOT?: DeviceTypeScalarWhereWithAggregatesInput | DeviceTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeviceType"> | string
    name?: StringWithAggregatesFilter<"DeviceType"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DeviceType"> | Date | string
  }

  export type DeviceBrandWhereInput = {
    AND?: DeviceBrandWhereInput | DeviceBrandWhereInput[]
    OR?: DeviceBrandWhereInput[]
    NOT?: DeviceBrandWhereInput | DeviceBrandWhereInput[]
    id?: StringFilter<"DeviceBrand"> | string
    name?: StringFilter<"DeviceBrand"> | string
    createdAt?: DateTimeFilter<"DeviceBrand"> | Date | string
    models?: DeviceModelListRelationFilter
  }

  export type DeviceBrandOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    models?: DeviceModelOrderByRelationAggregateInput
  }

  export type DeviceBrandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DeviceBrandWhereInput | DeviceBrandWhereInput[]
    OR?: DeviceBrandWhereInput[]
    NOT?: DeviceBrandWhereInput | DeviceBrandWhereInput[]
    createdAt?: DateTimeFilter<"DeviceBrand"> | Date | string
    models?: DeviceModelListRelationFilter
  }, "id" | "name">

  export type DeviceBrandOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: DeviceBrandCountOrderByAggregateInput
    _max?: DeviceBrandMaxOrderByAggregateInput
    _min?: DeviceBrandMinOrderByAggregateInput
  }

  export type DeviceBrandScalarWhereWithAggregatesInput = {
    AND?: DeviceBrandScalarWhereWithAggregatesInput | DeviceBrandScalarWhereWithAggregatesInput[]
    OR?: DeviceBrandScalarWhereWithAggregatesInput[]
    NOT?: DeviceBrandScalarWhereWithAggregatesInput | DeviceBrandScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeviceBrand"> | string
    name?: StringWithAggregatesFilter<"DeviceBrand"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DeviceBrand"> | Date | string
  }

  export type DeviceModelWhereInput = {
    AND?: DeviceModelWhereInput | DeviceModelWhereInput[]
    OR?: DeviceModelWhereInput[]
    NOT?: DeviceModelWhereInput | DeviceModelWhereInput[]
    id?: StringFilter<"DeviceModel"> | string
    name?: StringFilter<"DeviceModel"> | string
    brandId?: StringFilter<"DeviceModel"> | string
    typeId?: StringFilter<"DeviceModel"> | string
    createdAt?: DateTimeFilter<"DeviceModel"> | Date | string
    modelReference?: StringNullableFilter<"DeviceModel"> | string | null
    brand?: XOR<DeviceBrandRelationFilter, DeviceBrandWhereInput>
    type?: XOR<DeviceTypeRelationFilter, DeviceTypeWhereInput>
    parts?: PartListRelationFilter
    services?: ServiceListRelationFilter
  }

  export type DeviceModelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    brandId?: SortOrder
    typeId?: SortOrder
    createdAt?: SortOrder
    modelReference?: SortOrderInput | SortOrder
    brand?: DeviceBrandOrderByWithRelationInput
    type?: DeviceTypeOrderByWithRelationInput
    parts?: PartOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
  }

  export type DeviceModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_brandId?: DeviceModelNameBrandIdCompoundUniqueInput
    AND?: DeviceModelWhereInput | DeviceModelWhereInput[]
    OR?: DeviceModelWhereInput[]
    NOT?: DeviceModelWhereInput | DeviceModelWhereInput[]
    name?: StringFilter<"DeviceModel"> | string
    brandId?: StringFilter<"DeviceModel"> | string
    typeId?: StringFilter<"DeviceModel"> | string
    createdAt?: DateTimeFilter<"DeviceModel"> | Date | string
    modelReference?: StringNullableFilter<"DeviceModel"> | string | null
    brand?: XOR<DeviceBrandRelationFilter, DeviceBrandWhereInput>
    type?: XOR<DeviceTypeRelationFilter, DeviceTypeWhereInput>
    parts?: PartListRelationFilter
    services?: ServiceListRelationFilter
  }, "id" | "name_brandId">

  export type DeviceModelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    brandId?: SortOrder
    typeId?: SortOrder
    createdAt?: SortOrder
    modelReference?: SortOrderInput | SortOrder
    _count?: DeviceModelCountOrderByAggregateInput
    _max?: DeviceModelMaxOrderByAggregateInput
    _min?: DeviceModelMinOrderByAggregateInput
  }

  export type DeviceModelScalarWhereWithAggregatesInput = {
    AND?: DeviceModelScalarWhereWithAggregatesInput | DeviceModelScalarWhereWithAggregatesInput[]
    OR?: DeviceModelScalarWhereWithAggregatesInput[]
    NOT?: DeviceModelScalarWhereWithAggregatesInput | DeviceModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeviceModel"> | string
    name?: StringWithAggregatesFilter<"DeviceModel"> | string
    brandId?: StringWithAggregatesFilter<"DeviceModel"> | string
    typeId?: StringWithAggregatesFilter<"DeviceModel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DeviceModel"> | Date | string
    modelReference?: StringNullableWithAggregatesFilter<"DeviceModel"> | string | null
  }

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    sku?: StringFilter<"Part"> | string
    costPrice?: FloatFilter<"Part"> | number
    stock?: IntFilter<"Part"> | number
    minStock?: IntFilter<"Part"> | number
    supplier?: StringNullableFilter<"Part"> | string | null
    supplierRef?: StringNullableFilter<"Part"> | string | null
    location?: StringNullableFilter<"Part"> | string | null
    description?: StringNullableFilter<"Part"> | string | null
    modelId?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    quality?: StringNullableFilter<"Part"> | string | null
    model?: XOR<DeviceModelNullableRelationFilter, DeviceModelWhereInput> | null
    services?: ServiceListRelationFilter
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrderInput | SortOrder
    supplierRef?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    quality?: SortOrderInput | SortOrder
    model?: DeviceModelOrderByWithRelationInput
    services?: ServiceOrderByRelationAggregateInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    name?: StringFilter<"Part"> | string
    costPrice?: FloatFilter<"Part"> | number
    stock?: IntFilter<"Part"> | number
    minStock?: IntFilter<"Part"> | number
    supplier?: StringNullableFilter<"Part"> | string | null
    supplierRef?: StringNullableFilter<"Part"> | string | null
    location?: StringNullableFilter<"Part"> | string | null
    description?: StringNullableFilter<"Part"> | string | null
    modelId?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    quality?: StringNullableFilter<"Part"> | string | null
    model?: XOR<DeviceModelNullableRelationFilter, DeviceModelWhereInput> | null
    services?: ServiceListRelationFilter
  }, "id" | "sku">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrderInput | SortOrder
    supplierRef?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    quality?: SortOrderInput | SortOrder
    _count?: PartCountOrderByAggregateInput
    _avg?: PartAvgOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
    _sum?: PartSumOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    name?: StringWithAggregatesFilter<"Part"> | string
    sku?: StringWithAggregatesFilter<"Part"> | string
    costPrice?: FloatWithAggregatesFilter<"Part"> | number
    stock?: IntWithAggregatesFilter<"Part"> | number
    minStock?: IntWithAggregatesFilter<"Part"> | number
    supplier?: StringNullableWithAggregatesFilter<"Part"> | string | null
    supplierRef?: StringNullableWithAggregatesFilter<"Part"> | string | null
    location?: StringNullableWithAggregatesFilter<"Part"> | string | null
    description?: StringNullableWithAggregatesFilter<"Part"> | string | null
    modelId?: StringNullableWithAggregatesFilter<"Part"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
    quality?: StringNullableWithAggregatesFilter<"Part"> | string | null
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    laborCost?: FloatFilter<"Service"> | number
    suggestedPrice?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    partId?: StringNullableFilter<"Service"> | string | null
    modelId?: StringNullableFilter<"Service"> | string | null
    description?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    repairs?: RepairServiceListRelationFilter
    part?: XOR<PartNullableRelationFilter, PartWhereInput> | null
    model?: XOR<DeviceModelNullableRelationFilter, DeviceModelWhereInput> | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    laborCost?: SortOrder
    suggestedPrice?: SortOrder
    duration?: SortOrder
    partId?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    repairs?: RepairServiceOrderByRelationAggregateInput
    part?: PartOrderByWithRelationInput
    model?: DeviceModelOrderByWithRelationInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name?: StringFilter<"Service"> | string
    laborCost?: FloatFilter<"Service"> | number
    suggestedPrice?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    partId?: StringNullableFilter<"Service"> | string | null
    modelId?: StringNullableFilter<"Service"> | string | null
    description?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    repairs?: RepairServiceListRelationFilter
    part?: XOR<PartNullableRelationFilter, PartWhereInput> | null
    model?: XOR<DeviceModelNullableRelationFilter, DeviceModelWhereInput> | null
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    laborCost?: SortOrder
    suggestedPrice?: SortOrder
    duration?: SortOrder
    partId?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    laborCost?: FloatWithAggregatesFilter<"Service"> | number
    suggestedPrice?: FloatWithAggregatesFilter<"Service"> | number
    duration?: IntWithAggregatesFilter<"Service"> | number
    partId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    modelId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type RepairWhereInput = {
    AND?: RepairWhereInput | RepairWhereInput[]
    OR?: RepairWhereInput[]
    NOT?: RepairWhereInput | RepairWhereInput[]
    id?: StringFilter<"Repair"> | string
    status?: StringFilter<"Repair"> | string
    partStatus?: StringFilter<"Repair"> | string
    clientId?: StringFilter<"Repair"> | string
    notes?: StringNullableFilter<"Repair"> | string | null
    createdAt?: DateTimeFilter<"Repair"> | Date | string
    updatedAt?: DateTimeFilter<"Repair"> | Date | string
    invoices?: InvoiceListRelationFilter
    quotes?: QuoteListRelationFilter
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    logs?: RepairLogListRelationFilter
    services?: RepairServiceListRelationFilter
  }

  export type RepairOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    partStatus?: SortOrder
    clientId?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoices?: InvoiceOrderByRelationAggregateInput
    quotes?: QuoteOrderByRelationAggregateInput
    client?: ClientOrderByWithRelationInput
    logs?: RepairLogOrderByRelationAggregateInput
    services?: RepairServiceOrderByRelationAggregateInput
  }

  export type RepairWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RepairWhereInput | RepairWhereInput[]
    OR?: RepairWhereInput[]
    NOT?: RepairWhereInput | RepairWhereInput[]
    status?: StringFilter<"Repair"> | string
    partStatus?: StringFilter<"Repair"> | string
    clientId?: StringFilter<"Repair"> | string
    notes?: StringNullableFilter<"Repair"> | string | null
    createdAt?: DateTimeFilter<"Repair"> | Date | string
    updatedAt?: DateTimeFilter<"Repair"> | Date | string
    invoices?: InvoiceListRelationFilter
    quotes?: QuoteListRelationFilter
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    logs?: RepairLogListRelationFilter
    services?: RepairServiceListRelationFilter
  }, "id">

  export type RepairOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    partStatus?: SortOrder
    clientId?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RepairCountOrderByAggregateInput
    _max?: RepairMaxOrderByAggregateInput
    _min?: RepairMinOrderByAggregateInput
  }

  export type RepairScalarWhereWithAggregatesInput = {
    AND?: RepairScalarWhereWithAggregatesInput | RepairScalarWhereWithAggregatesInput[]
    OR?: RepairScalarWhereWithAggregatesInput[]
    NOT?: RepairScalarWhereWithAggregatesInput | RepairScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Repair"> | string
    status?: StringWithAggregatesFilter<"Repair"> | string
    partStatus?: StringWithAggregatesFilter<"Repair"> | string
    clientId?: StringWithAggregatesFilter<"Repair"> | string
    notes?: StringNullableWithAggregatesFilter<"Repair"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Repair"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Repair"> | Date | string
  }

  export type RepairServiceWhereInput = {
    AND?: RepairServiceWhereInput | RepairServiceWhereInput[]
    OR?: RepairServiceWhereInput[]
    NOT?: RepairServiceWhereInput | RepairServiceWhereInput[]
    id?: StringFilter<"RepairService"> | string
    repairId?: StringFilter<"RepairService"> | string
    serviceId?: StringFilter<"RepairService"> | string
    quantity?: IntFilter<"RepairService"> | number
    priceAtTime?: FloatFilter<"RepairService"> | number
    repair?: XOR<RepairRelationFilter, RepairWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }

  export type RepairServiceOrderByWithRelationInput = {
    id?: SortOrder
    repairId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
    repair?: RepairOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type RepairServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RepairServiceWhereInput | RepairServiceWhereInput[]
    OR?: RepairServiceWhereInput[]
    NOT?: RepairServiceWhereInput | RepairServiceWhereInput[]
    repairId?: StringFilter<"RepairService"> | string
    serviceId?: StringFilter<"RepairService"> | string
    quantity?: IntFilter<"RepairService"> | number
    priceAtTime?: FloatFilter<"RepairService"> | number
    repair?: XOR<RepairRelationFilter, RepairWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }, "id">

  export type RepairServiceOrderByWithAggregationInput = {
    id?: SortOrder
    repairId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
    _count?: RepairServiceCountOrderByAggregateInput
    _avg?: RepairServiceAvgOrderByAggregateInput
    _max?: RepairServiceMaxOrderByAggregateInput
    _min?: RepairServiceMinOrderByAggregateInput
    _sum?: RepairServiceSumOrderByAggregateInput
  }

  export type RepairServiceScalarWhereWithAggregatesInput = {
    AND?: RepairServiceScalarWhereWithAggregatesInput | RepairServiceScalarWhereWithAggregatesInput[]
    OR?: RepairServiceScalarWhereWithAggregatesInput[]
    NOT?: RepairServiceScalarWhereWithAggregatesInput | RepairServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RepairService"> | string
    repairId?: StringWithAggregatesFilter<"RepairService"> | string
    serviceId?: StringWithAggregatesFilter<"RepairService"> | string
    quantity?: IntWithAggregatesFilter<"RepairService"> | number
    priceAtTime?: FloatWithAggregatesFilter<"RepairService"> | number
  }

  export type RepairLogWhereInput = {
    AND?: RepairLogWhereInput | RepairLogWhereInput[]
    OR?: RepairLogWhereInput[]
    NOT?: RepairLogWhereInput | RepairLogWhereInput[]
    id?: StringFilter<"RepairLog"> | string
    repairId?: StringFilter<"RepairLog"> | string
    status?: StringFilter<"RepairLog"> | string
    comment?: StringNullableFilter<"RepairLog"> | string | null
    createdAt?: DateTimeFilter<"RepairLog"> | Date | string
    repair?: XOR<RepairRelationFilter, RepairWhereInput>
  }

  export type RepairLogOrderByWithRelationInput = {
    id?: SortOrder
    repairId?: SortOrder
    status?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    repair?: RepairOrderByWithRelationInput
  }

  export type RepairLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RepairLogWhereInput | RepairLogWhereInput[]
    OR?: RepairLogWhereInput[]
    NOT?: RepairLogWhereInput | RepairLogWhereInput[]
    repairId?: StringFilter<"RepairLog"> | string
    status?: StringFilter<"RepairLog"> | string
    comment?: StringNullableFilter<"RepairLog"> | string | null
    createdAt?: DateTimeFilter<"RepairLog"> | Date | string
    repair?: XOR<RepairRelationFilter, RepairWhereInput>
  }, "id">

  export type RepairLogOrderByWithAggregationInput = {
    id?: SortOrder
    repairId?: SortOrder
    status?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RepairLogCountOrderByAggregateInput
    _max?: RepairLogMaxOrderByAggregateInput
    _min?: RepairLogMinOrderByAggregateInput
  }

  export type RepairLogScalarWhereWithAggregatesInput = {
    AND?: RepairLogScalarWhereWithAggregatesInput | RepairLogScalarWhereWithAggregatesInput[]
    OR?: RepairLogScalarWhereWithAggregatesInput[]
    NOT?: RepairLogScalarWhereWithAggregatesInput | RepairLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RepairLog"> | string
    repairId?: StringWithAggregatesFilter<"RepairLog"> | string
    status?: StringWithAggregatesFilter<"RepairLog"> | string
    comment?: StringNullableWithAggregatesFilter<"RepairLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RepairLog"> | Date | string
  }

  export type ShopProductWhereInput = {
    AND?: ShopProductWhereInput | ShopProductWhereInput[]
    OR?: ShopProductWhereInput[]
    NOT?: ShopProductWhereInput | ShopProductWhereInput[]
    id?: StringFilter<"ShopProduct"> | string
    name?: StringFilter<"ShopProduct"> | string
    category?: StringFilter<"ShopProduct"> | string
    sku?: StringNullableFilter<"ShopProduct"> | string | null
    barcode?: StringNullableFilter<"ShopProduct"> | string | null
    purchasePrice?: FloatFilter<"ShopProduct"> | number
    sellingPrice?: FloatFilter<"ShopProduct"> | number
    stock?: IntFilter<"ShopProduct"> | number
    minStock?: IntFilter<"ShopProduct"> | number
    supplier?: StringNullableFilter<"ShopProduct"> | string | null
    description?: StringNullableFilter<"ShopProduct"> | string | null
    imageUrl?: StringNullableFilter<"ShopProduct"> | string | null
    createdAt?: DateTimeFilter<"ShopProduct"> | Date | string
    updatedAt?: DateTimeFilter<"ShopProduct"> | Date | string
  }

  export type ShopProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    sku?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    purchasePrice?: SortOrder
    sellingPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    barcode?: string
    AND?: ShopProductWhereInput | ShopProductWhereInput[]
    OR?: ShopProductWhereInput[]
    NOT?: ShopProductWhereInput | ShopProductWhereInput[]
    name?: StringFilter<"ShopProduct"> | string
    category?: StringFilter<"ShopProduct"> | string
    purchasePrice?: FloatFilter<"ShopProduct"> | number
    sellingPrice?: FloatFilter<"ShopProduct"> | number
    stock?: IntFilter<"ShopProduct"> | number
    minStock?: IntFilter<"ShopProduct"> | number
    supplier?: StringNullableFilter<"ShopProduct"> | string | null
    description?: StringNullableFilter<"ShopProduct"> | string | null
    imageUrl?: StringNullableFilter<"ShopProduct"> | string | null
    createdAt?: DateTimeFilter<"ShopProduct"> | Date | string
    updatedAt?: DateTimeFilter<"ShopProduct"> | Date | string
  }, "id" | "sku" | "barcode">

  export type ShopProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    sku?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    purchasePrice?: SortOrder
    sellingPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopProductCountOrderByAggregateInput
    _avg?: ShopProductAvgOrderByAggregateInput
    _max?: ShopProductMaxOrderByAggregateInput
    _min?: ShopProductMinOrderByAggregateInput
    _sum?: ShopProductSumOrderByAggregateInput
  }

  export type ShopProductScalarWhereWithAggregatesInput = {
    AND?: ShopProductScalarWhereWithAggregatesInput | ShopProductScalarWhereWithAggregatesInput[]
    OR?: ShopProductScalarWhereWithAggregatesInput[]
    NOT?: ShopProductScalarWhereWithAggregatesInput | ShopProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShopProduct"> | string
    name?: StringWithAggregatesFilter<"ShopProduct"> | string
    category?: StringWithAggregatesFilter<"ShopProduct"> | string
    sku?: StringNullableWithAggregatesFilter<"ShopProduct"> | string | null
    barcode?: StringNullableWithAggregatesFilter<"ShopProduct"> | string | null
    purchasePrice?: FloatWithAggregatesFilter<"ShopProduct"> | number
    sellingPrice?: FloatWithAggregatesFilter<"ShopProduct"> | number
    stock?: IntWithAggregatesFilter<"ShopProduct"> | number
    minStock?: IntWithAggregatesFilter<"ShopProduct"> | number
    supplier?: StringNullableWithAggregatesFilter<"ShopProduct"> | string | null
    description?: StringNullableWithAggregatesFilter<"ShopProduct"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"ShopProduct"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ShopProduct"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShopProduct"> | Date | string
  }

  export type WorkshopSettingsWhereInput = {
    AND?: WorkshopSettingsWhereInput | WorkshopSettingsWhereInput[]
    OR?: WorkshopSettingsWhereInput[]
    NOT?: WorkshopSettingsWhereInput | WorkshopSettingsWhereInput[]
    id?: StringFilter<"WorkshopSettings"> | string
    name?: StringFilter<"WorkshopSettings"> | string
    address?: StringFilter<"WorkshopSettings"> | string
    zipCode?: StringFilter<"WorkshopSettings"> | string
    city?: StringFilter<"WorkshopSettings"> | string
    countryCode?: StringFilter<"WorkshopSettings"> | string
    phone?: StringFilter<"WorkshopSettings"> | string
    email?: StringFilter<"WorkshopSettings"> | string
    siret?: StringFilter<"WorkshopSettings"> | string
    vatNumber?: StringFilter<"WorkshopSettings"> | string
    legalForm?: StringFilter<"WorkshopSettings"> | string
    capital?: StringFilter<"WorkshopSettings"> | string
    rcs?: StringFilter<"WorkshopSettings"> | string
    iban?: StringNullableFilter<"WorkshopSettings"> | string | null
    bic?: StringNullableFilter<"WorkshopSettings"> | string | null
    updatedAt?: DateTimeFilter<"WorkshopSettings"> | Date | string
  }

  export type WorkshopSettingsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    countryCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
    legalForm?: SortOrder
    capital?: SortOrder
    rcs?: SortOrder
    iban?: SortOrderInput | SortOrder
    bic?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type WorkshopSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkshopSettingsWhereInput | WorkshopSettingsWhereInput[]
    OR?: WorkshopSettingsWhereInput[]
    NOT?: WorkshopSettingsWhereInput | WorkshopSettingsWhereInput[]
    name?: StringFilter<"WorkshopSettings"> | string
    address?: StringFilter<"WorkshopSettings"> | string
    zipCode?: StringFilter<"WorkshopSettings"> | string
    city?: StringFilter<"WorkshopSettings"> | string
    countryCode?: StringFilter<"WorkshopSettings"> | string
    phone?: StringFilter<"WorkshopSettings"> | string
    email?: StringFilter<"WorkshopSettings"> | string
    siret?: StringFilter<"WorkshopSettings"> | string
    vatNumber?: StringFilter<"WorkshopSettings"> | string
    legalForm?: StringFilter<"WorkshopSettings"> | string
    capital?: StringFilter<"WorkshopSettings"> | string
    rcs?: StringFilter<"WorkshopSettings"> | string
    iban?: StringNullableFilter<"WorkshopSettings"> | string | null
    bic?: StringNullableFilter<"WorkshopSettings"> | string | null
    updatedAt?: DateTimeFilter<"WorkshopSettings"> | Date | string
  }, "id">

  export type WorkshopSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    countryCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
    legalForm?: SortOrder
    capital?: SortOrder
    rcs?: SortOrder
    iban?: SortOrderInput | SortOrder
    bic?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: WorkshopSettingsCountOrderByAggregateInput
    _max?: WorkshopSettingsMaxOrderByAggregateInput
    _min?: WorkshopSettingsMinOrderByAggregateInput
  }

  export type WorkshopSettingsScalarWhereWithAggregatesInput = {
    AND?: WorkshopSettingsScalarWhereWithAggregatesInput | WorkshopSettingsScalarWhereWithAggregatesInput[]
    OR?: WorkshopSettingsScalarWhereWithAggregatesInput[]
    NOT?: WorkshopSettingsScalarWhereWithAggregatesInput | WorkshopSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    name?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    address?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    zipCode?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    city?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    countryCode?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    phone?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    email?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    siret?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    vatNumber?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    legalForm?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    capital?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    rcs?: StringWithAggregatesFilter<"WorkshopSettings"> | string
    iban?: StringNullableWithAggregatesFilter<"WorkshopSettings"> | string | null
    bic?: StringNullableWithAggregatesFilter<"WorkshopSettings"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"WorkshopSettings"> | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    invoices?: InvoiceCreateNestedManyWithoutClientInput
    quotes?: QuoteCreateNestedManyWithoutClientInput
    repairs?: RepairCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    invoices?: InvoiceUncheckedCreateNestedManyWithoutClientInput
    quotes?: QuoteUncheckedCreateNestedManyWithoutClientInput
    repairs?: RepairUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUpdateManyWithoutClientNestedInput
    quotes?: QuoteUpdateManyWithoutClientNestedInput
    repairs?: RepairUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUncheckedUpdateManyWithoutClientNestedInput
    quotes?: QuoteUncheckedUpdateManyWithoutClientNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuoteCreateInput = {
    id?: string
    number: string
    status?: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    client: ClientCreateNestedOneWithoutQuotesInput
    repair?: RepairCreateNestedOneWithoutQuotesInput
    invoice?: InvoiceCreateNestedOneWithoutQuoteInput
  }

  export type QuoteUncheckedCreateInput = {
    id?: string
    number: string
    status?: string
    clientId: string
    repairId?: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
  }

  export type QuoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutQuotesNestedInput
    repair?: RepairUpdateOneWithoutQuotesNestedInput
    invoice?: InvoiceUpdateOneWithoutQuoteNestedInput
  }

  export type QuoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvoiceCreateInput = {
    id?: string
    number: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    client: ClientCreateNestedOneWithoutInvoicesInput
    repair?: RepairCreateNestedOneWithoutInvoicesInput
    quote?: QuoteCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    number: string
    clientId: string
    repairId?: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    quote?: QuoteUncheckedCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutInvoicesNestedInput
    repair?: RepairUpdateOneWithoutInvoicesNestedInput
    quote?: QuoteUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quote?: QuoteUncheckedUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeviceTypeCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    models?: DeviceModelCreateNestedManyWithoutTypeInput
  }

  export type DeviceTypeUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    models?: DeviceModelUncheckedCreateNestedManyWithoutTypeInput
  }

  export type DeviceTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: DeviceModelUpdateManyWithoutTypeNestedInput
  }

  export type DeviceTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: DeviceModelUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type DeviceTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceBrandCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    models?: DeviceModelCreateNestedManyWithoutBrandInput
  }

  export type DeviceBrandUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    models?: DeviceModelUncheckedCreateNestedManyWithoutBrandInput
  }

  export type DeviceBrandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: DeviceModelUpdateManyWithoutBrandNestedInput
  }

  export type DeviceBrandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: DeviceModelUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type DeviceBrandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceBrandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceModelCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    modelReference?: string | null
    brand: DeviceBrandCreateNestedOneWithoutModelsInput
    type: DeviceTypeCreateNestedOneWithoutModelsInput
    parts?: PartCreateNestedManyWithoutModelInput
    services?: ServiceCreateNestedManyWithoutModelInput
  }

  export type DeviceModelUncheckedCreateInput = {
    id?: string
    name: string
    brandId: string
    typeId: string
    createdAt?: Date | string
    modelReference?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutModelInput
    services?: ServiceUncheckedCreateNestedManyWithoutModelInput
  }

  export type DeviceModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: DeviceBrandUpdateOneRequiredWithoutModelsNestedInput
    type?: DeviceTypeUpdateOneRequiredWithoutModelsNestedInput
    parts?: PartUpdateManyWithoutModelNestedInput
    services?: ServiceUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    typeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutModelNestedInput
    services?: ServiceUncheckedUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeviceModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    typeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PartCreateInput = {
    id?: string
    name: string
    sku: string
    costPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    supplierRef?: string | null
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    quality?: string | null
    model?: DeviceModelCreateNestedOneWithoutPartsInput
    services?: ServiceCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateInput = {
    id?: string
    name: string
    sku: string
    costPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    supplierRef?: string | null
    location?: string | null
    description?: string | null
    modelId?: string | null
    createdAt?: Date | string
    quality?: string | null
    services?: ServiceUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
    model?: DeviceModelUpdateOneWithoutPartsNestedInput
    services?: ServiceUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
    services?: ServiceUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    description?: string | null
    createdAt?: Date | string
    repairs?: RepairServiceCreateNestedManyWithoutServiceInput
    part?: PartCreateNestedOneWithoutServicesInput
    model?: DeviceModelCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    partId?: string | null
    modelId?: string | null
    description?: string | null
    createdAt?: Date | string
    repairs?: RepairServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairServiceUpdateManyWithoutServiceNestedInput
    part?: PartUpdateOneWithoutServicesNestedInput
    model?: DeviceModelUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    partId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    partId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairCreateInput = {
    id?: string
    status?: string
    partStatus?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutRepairInput
    quotes?: QuoteCreateNestedManyWithoutRepairInput
    client: ClientCreateNestedOneWithoutRepairsInput
    logs?: RepairLogCreateNestedManyWithoutRepairInput
    services?: RepairServiceCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateInput = {
    id?: string
    status?: string
    partStatus?: string
    clientId: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutRepairInput
    quotes?: QuoteUncheckedCreateNestedManyWithoutRepairInput
    logs?: RepairLogUncheckedCreateNestedManyWithoutRepairInput
    services?: RepairServiceUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUpdateManyWithoutRepairNestedInput
    client?: ClientUpdateOneRequiredWithoutRepairsNestedInput
    logs?: RepairLogUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUncheckedUpdateManyWithoutRepairNestedInput
    logs?: RepairLogUncheckedUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type RepairUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairServiceCreateInput = {
    id?: string
    quantity?: number
    priceAtTime: number
    repair: RepairCreateNestedOneWithoutServicesInput
    service: ServiceCreateNestedOneWithoutRepairsInput
  }

  export type RepairServiceUncheckedCreateInput = {
    id?: string
    repairId: string
    serviceId: string
    quantity?: number
    priceAtTime: number
  }

  export type RepairServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
    repair?: RepairUpdateOneRequiredWithoutServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutRepairsNestedInput
  }

  export type RepairServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type RepairServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type RepairServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type RepairLogCreateInput = {
    id?: string
    status: string
    comment?: string | null
    createdAt?: Date | string
    repair: RepairCreateNestedOneWithoutLogsInput
  }

  export type RepairLogUncheckedCreateInput = {
    id?: string
    repairId: string
    status: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type RepairLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repair?: RepairUpdateOneRequiredWithoutLogsNestedInput
  }

  export type RepairLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopProductCreateInput = {
    id?: string
    name: string
    category: string
    sku?: string | null
    barcode?: string | null
    purchasePrice: number
    sellingPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopProductUncheckedCreateInput = {
    id?: string
    name: string
    category: string
    sku?: string | null
    barcode?: string | null
    purchasePrice: number
    sellingPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkshopSettingsCreateInput = {
    id?: string
    name?: string
    address?: string
    zipCode?: string
    city?: string
    countryCode?: string
    phone?: string
    email?: string
    siret?: string
    vatNumber?: string
    legalForm?: string
    capital?: string
    rcs?: string
    iban?: string | null
    bic?: string | null
    updatedAt?: Date | string
  }

  export type WorkshopSettingsUncheckedCreateInput = {
    id?: string
    name?: string
    address?: string
    zipCode?: string
    city?: string
    countryCode?: string
    phone?: string
    email?: string
    siret?: string
    vatNumber?: string
    legalForm?: string
    capital?: string
    rcs?: string
    iban?: string | null
    bic?: string | null
    updatedAt?: Date | string
  }

  export type WorkshopSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    siret?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    legalForm?: StringFieldUpdateOperationsInput | string
    capital?: StringFieldUpdateOperationsInput | string
    rcs?: StringFieldUpdateOperationsInput | string
    iban?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkshopSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    siret?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    legalForm?: StringFieldUpdateOperationsInput | string
    capital?: StringFieldUpdateOperationsInput | string
    rcs?: StringFieldUpdateOperationsInput | string
    iban?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkshopSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    siret?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    legalForm?: StringFieldUpdateOperationsInput | string
    capital?: StringFieldUpdateOperationsInput | string
    rcs?: StringFieldUpdateOperationsInput | string
    iban?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkshopSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    siret?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    legalForm?: StringFieldUpdateOperationsInput | string
    capital?: StringFieldUpdateOperationsInput | string
    rcs?: StringFieldUpdateOperationsInput | string
    iban?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type QuoteListRelationFilter = {
    every?: QuoteWhereInput
    some?: QuoteWhereInput
    none?: QuoteWhereInput
  }

  export type RepairListRelationFilter = {
    every?: RepairWhereInput
    some?: RepairWhereInput
    none?: RepairWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepairOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    clientType?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    createdAt?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    clientType?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    createdAt?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    clientType?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    createdAt?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClientRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type RepairNullableRelationFilter = {
    is?: RepairWhereInput | null
    isNot?: RepairWhereInput | null
  }

  export type InvoiceNullableRelationFilter = {
    is?: InvoiceWhereInput | null
    isNot?: InvoiceWhereInput | null
  }

  export type QuoteCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrder
    validUntil?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrder
  }

  export type QuoteAvgOrderByAggregateInput = {
    totalHT?: SortOrder
    totalTTC?: SortOrder
  }

  export type QuoteMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrder
    validUntil?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrder
  }

  export type QuoteMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrder
    validUntil?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrder
  }

  export type QuoteSumOrderByAggregateInput = {
    totalHT?: SortOrder
    totalTTC?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type QuoteNullableRelationFilter = {
    is?: QuoteWhereInput | null
    isNot?: QuoteWhereInput | null
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrder
    paid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    totalHT?: SortOrder
    totalTTC?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrder
    paid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    clientId?: SortOrder
    repairId?: SortOrder
    items?: SortOrder
    totalHT?: SortOrder
    totalTTC?: SortOrder
    notes?: SortOrder
    paid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    taxDetails?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    totalHT?: SortOrder
    totalTTC?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DeviceModelListRelationFilter = {
    every?: DeviceModelWhereInput
    some?: DeviceModelWhereInput
    none?: DeviceModelWhereInput
  }

  export type DeviceModelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceBrandCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceBrandMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceBrandMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceBrandRelationFilter = {
    is?: DeviceBrandWhereInput
    isNot?: DeviceBrandWhereInput
  }

  export type DeviceTypeRelationFilter = {
    is?: DeviceTypeWhereInput
    isNot?: DeviceTypeWhereInput
  }

  export type PartListRelationFilter = {
    every?: PartWhereInput
    some?: PartWhereInput
    none?: PartWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type PartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceModelNameBrandIdCompoundUniqueInput = {
    name: string
    brandId: string
  }

  export type DeviceModelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brandId?: SortOrder
    typeId?: SortOrder
    createdAt?: SortOrder
    modelReference?: SortOrder
  }

  export type DeviceModelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brandId?: SortOrder
    typeId?: SortOrder
    createdAt?: SortOrder
    modelReference?: SortOrder
  }

  export type DeviceModelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brandId?: SortOrder
    typeId?: SortOrder
    createdAt?: SortOrder
    modelReference?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DeviceModelNullableRelationFilter = {
    is?: DeviceModelWhereInput | null
    isNot?: DeviceModelWhereInput | null
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrder
    supplierRef?: SortOrder
    location?: SortOrder
    description?: SortOrder
    modelId?: SortOrder
    createdAt?: SortOrder
    quality?: SortOrder
  }

  export type PartAvgOrderByAggregateInput = {
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrder
    supplierRef?: SortOrder
    location?: SortOrder
    description?: SortOrder
    modelId?: SortOrder
    createdAt?: SortOrder
    quality?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrder
    supplierRef?: SortOrder
    location?: SortOrder
    description?: SortOrder
    modelId?: SortOrder
    createdAt?: SortOrder
    quality?: SortOrder
  }

  export type PartSumOrderByAggregateInput = {
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type RepairServiceListRelationFilter = {
    every?: RepairServiceWhereInput
    some?: RepairServiceWhereInput
    none?: RepairServiceWhereInput
  }

  export type PartNullableRelationFilter = {
    is?: PartWhereInput | null
    isNot?: PartWhereInput | null
  }

  export type RepairServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    laborCost?: SortOrder
    suggestedPrice?: SortOrder
    duration?: SortOrder
    partId?: SortOrder
    modelId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    laborCost?: SortOrder
    suggestedPrice?: SortOrder
    duration?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    laborCost?: SortOrder
    suggestedPrice?: SortOrder
    duration?: SortOrder
    partId?: SortOrder
    modelId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    laborCost?: SortOrder
    suggestedPrice?: SortOrder
    duration?: SortOrder
    partId?: SortOrder
    modelId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    laborCost?: SortOrder
    suggestedPrice?: SortOrder
    duration?: SortOrder
  }

  export type RepairLogListRelationFilter = {
    every?: RepairLogWhereInput
    some?: RepairLogWhereInput
    none?: RepairLogWhereInput
  }

  export type RepairLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepairCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    partStatus?: SortOrder
    clientId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    partStatus?: SortOrder
    clientId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    partStatus?: SortOrder
    clientId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairRelationFilter = {
    is?: RepairWhereInput
    isNot?: RepairWhereInput
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type RepairServiceCountOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type RepairServiceAvgOrderByAggregateInput = {
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type RepairServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type RepairServiceMinOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type RepairServiceSumOrderByAggregateInput = {
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type RepairLogCountOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type RepairLogMaxOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type RepairLogMinOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ShopProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    purchasePrice?: SortOrder
    sellingPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopProductAvgOrderByAggregateInput = {
    purchasePrice?: SortOrder
    sellingPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
  }

  export type ShopProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    purchasePrice?: SortOrder
    sellingPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    purchasePrice?: SortOrder
    sellingPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    supplier?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopProductSumOrderByAggregateInput = {
    purchasePrice?: SortOrder
    sellingPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
  }

  export type WorkshopSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    countryCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
    legalForm?: SortOrder
    capital?: SortOrder
    rcs?: SortOrder
    iban?: SortOrder
    bic?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkshopSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    countryCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
    legalForm?: SortOrder
    capital?: SortOrder
    rcs?: SortOrder
    iban?: SortOrder
    bic?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkshopSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    countryCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    siret?: SortOrder
    vatNumber?: SortOrder
    legalForm?: SortOrder
    capital?: SortOrder
    rcs?: SortOrder
    iban?: SortOrder
    bic?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceCreateNestedManyWithoutClientInput = {
    create?: XOR<InvoiceCreateWithoutClientInput, InvoiceUncheckedCreateWithoutClientInput> | InvoiceCreateWithoutClientInput[] | InvoiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClientInput | InvoiceCreateOrConnectWithoutClientInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type QuoteCreateNestedManyWithoutClientInput = {
    create?: XOR<QuoteCreateWithoutClientInput, QuoteUncheckedCreateWithoutClientInput> | QuoteCreateWithoutClientInput[] | QuoteUncheckedCreateWithoutClientInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutClientInput | QuoteCreateOrConnectWithoutClientInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
  }

  export type RepairCreateNestedManyWithoutClientInput = {
    create?: XOR<RepairCreateWithoutClientInput, RepairUncheckedCreateWithoutClientInput> | RepairCreateWithoutClientInput[] | RepairUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutClientInput | RepairCreateOrConnectWithoutClientInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<InvoiceCreateWithoutClientInput, InvoiceUncheckedCreateWithoutClientInput> | InvoiceCreateWithoutClientInput[] | InvoiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClientInput | InvoiceCreateOrConnectWithoutClientInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type QuoteUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<QuoteCreateWithoutClientInput, QuoteUncheckedCreateWithoutClientInput> | QuoteCreateWithoutClientInput[] | QuoteUncheckedCreateWithoutClientInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutClientInput | QuoteCreateOrConnectWithoutClientInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
  }

  export type RepairUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<RepairCreateWithoutClientInput, RepairUncheckedCreateWithoutClientInput> | RepairCreateWithoutClientInput[] | RepairUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutClientInput | RepairCreateOrConnectWithoutClientInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InvoiceUpdateManyWithoutClientNestedInput = {
    create?: XOR<InvoiceCreateWithoutClientInput, InvoiceUncheckedCreateWithoutClientInput> | InvoiceCreateWithoutClientInput[] | InvoiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClientInput | InvoiceCreateOrConnectWithoutClientInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutClientInput | InvoiceUpsertWithWhereUniqueWithoutClientInput[]
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutClientInput | InvoiceUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutClientInput | InvoiceUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type QuoteUpdateManyWithoutClientNestedInput = {
    create?: XOR<QuoteCreateWithoutClientInput, QuoteUncheckedCreateWithoutClientInput> | QuoteCreateWithoutClientInput[] | QuoteUncheckedCreateWithoutClientInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutClientInput | QuoteCreateOrConnectWithoutClientInput[]
    upsert?: QuoteUpsertWithWhereUniqueWithoutClientInput | QuoteUpsertWithWhereUniqueWithoutClientInput[]
    set?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    disconnect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    delete?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    update?: QuoteUpdateWithWhereUniqueWithoutClientInput | QuoteUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: QuoteUpdateManyWithWhereWithoutClientInput | QuoteUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: QuoteScalarWhereInput | QuoteScalarWhereInput[]
  }

  export type RepairUpdateManyWithoutClientNestedInput = {
    create?: XOR<RepairCreateWithoutClientInput, RepairUncheckedCreateWithoutClientInput> | RepairCreateWithoutClientInput[] | RepairUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutClientInput | RepairCreateOrConnectWithoutClientInput[]
    upsert?: RepairUpsertWithWhereUniqueWithoutClientInput | RepairUpsertWithWhereUniqueWithoutClientInput[]
    set?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    disconnect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    delete?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    update?: RepairUpdateWithWhereUniqueWithoutClientInput | RepairUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: RepairUpdateManyWithWhereWithoutClientInput | RepairUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: RepairScalarWhereInput | RepairScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<InvoiceCreateWithoutClientInput, InvoiceUncheckedCreateWithoutClientInput> | InvoiceCreateWithoutClientInput[] | InvoiceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClientInput | InvoiceCreateOrConnectWithoutClientInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutClientInput | InvoiceUpsertWithWhereUniqueWithoutClientInput[]
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutClientInput | InvoiceUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutClientInput | InvoiceUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type QuoteUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<QuoteCreateWithoutClientInput, QuoteUncheckedCreateWithoutClientInput> | QuoteCreateWithoutClientInput[] | QuoteUncheckedCreateWithoutClientInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutClientInput | QuoteCreateOrConnectWithoutClientInput[]
    upsert?: QuoteUpsertWithWhereUniqueWithoutClientInput | QuoteUpsertWithWhereUniqueWithoutClientInput[]
    set?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    disconnect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    delete?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    update?: QuoteUpdateWithWhereUniqueWithoutClientInput | QuoteUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: QuoteUpdateManyWithWhereWithoutClientInput | QuoteUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: QuoteScalarWhereInput | QuoteScalarWhereInput[]
  }

  export type RepairUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<RepairCreateWithoutClientInput, RepairUncheckedCreateWithoutClientInput> | RepairCreateWithoutClientInput[] | RepairUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RepairCreateOrConnectWithoutClientInput | RepairCreateOrConnectWithoutClientInput[]
    upsert?: RepairUpsertWithWhereUniqueWithoutClientInput | RepairUpsertWithWhereUniqueWithoutClientInput[]
    set?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    disconnect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    delete?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    connect?: RepairWhereUniqueInput | RepairWhereUniqueInput[]
    update?: RepairUpdateWithWhereUniqueWithoutClientInput | RepairUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: RepairUpdateManyWithWhereWithoutClientInput | RepairUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: RepairScalarWhereInput | RepairScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutQuotesInput = {
    create?: XOR<ClientCreateWithoutQuotesInput, ClientUncheckedCreateWithoutQuotesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutQuotesInput
    connect?: ClientWhereUniqueInput
  }

  export type RepairCreateNestedOneWithoutQuotesInput = {
    create?: XOR<RepairCreateWithoutQuotesInput, RepairUncheckedCreateWithoutQuotesInput>
    connectOrCreate?: RepairCreateOrConnectWithoutQuotesInput
    connect?: RepairWhereUniqueInput
  }

  export type InvoiceCreateNestedOneWithoutQuoteInput = {
    create?: XOR<InvoiceCreateWithoutQuoteInput, InvoiceUncheckedCreateWithoutQuoteInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutQuoteInput
    connect?: InvoiceWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ClientUpdateOneRequiredWithoutQuotesNestedInput = {
    create?: XOR<ClientCreateWithoutQuotesInput, ClientUncheckedCreateWithoutQuotesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutQuotesInput
    upsert?: ClientUpsertWithoutQuotesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutQuotesInput, ClientUpdateWithoutQuotesInput>, ClientUncheckedUpdateWithoutQuotesInput>
  }

  export type RepairUpdateOneWithoutQuotesNestedInput = {
    create?: XOR<RepairCreateWithoutQuotesInput, RepairUncheckedCreateWithoutQuotesInput>
    connectOrCreate?: RepairCreateOrConnectWithoutQuotesInput
    upsert?: RepairUpsertWithoutQuotesInput
    disconnect?: RepairWhereInput | boolean
    delete?: RepairWhereInput | boolean
    connect?: RepairWhereUniqueInput
    update?: XOR<XOR<RepairUpdateToOneWithWhereWithoutQuotesInput, RepairUpdateWithoutQuotesInput>, RepairUncheckedUpdateWithoutQuotesInput>
  }

  export type InvoiceUpdateOneWithoutQuoteNestedInput = {
    create?: XOR<InvoiceCreateWithoutQuoteInput, InvoiceUncheckedCreateWithoutQuoteInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutQuoteInput
    upsert?: InvoiceUpsertWithoutQuoteInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutQuoteInput, InvoiceUpdateWithoutQuoteInput>, InvoiceUncheckedUpdateWithoutQuoteInput>
  }

  export type ClientCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<ClientCreateWithoutInvoicesInput, ClientUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutInvoicesInput
    connect?: ClientWhereUniqueInput
  }

  export type RepairCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<RepairCreateWithoutInvoicesInput, RepairUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: RepairCreateOrConnectWithoutInvoicesInput
    connect?: RepairWhereUniqueInput
  }

  export type QuoteCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<QuoteCreateWithoutInvoiceInput, QuoteUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutInvoiceInput
    connect?: QuoteWhereUniqueInput
  }

  export type QuoteUncheckedCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<QuoteCreateWithoutInvoiceInput, QuoteUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutInvoiceInput
    connect?: QuoteWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ClientUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<ClientCreateWithoutInvoicesInput, ClientUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutInvoicesInput
    upsert?: ClientUpsertWithoutInvoicesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutInvoicesInput, ClientUpdateWithoutInvoicesInput>, ClientUncheckedUpdateWithoutInvoicesInput>
  }

  export type RepairUpdateOneWithoutInvoicesNestedInput = {
    create?: XOR<RepairCreateWithoutInvoicesInput, RepairUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: RepairCreateOrConnectWithoutInvoicesInput
    upsert?: RepairUpsertWithoutInvoicesInput
    disconnect?: RepairWhereInput | boolean
    delete?: RepairWhereInput | boolean
    connect?: RepairWhereUniqueInput
    update?: XOR<XOR<RepairUpdateToOneWithWhereWithoutInvoicesInput, RepairUpdateWithoutInvoicesInput>, RepairUncheckedUpdateWithoutInvoicesInput>
  }

  export type QuoteUpdateOneWithoutInvoiceNestedInput = {
    create?: XOR<QuoteCreateWithoutInvoiceInput, QuoteUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutInvoiceInput
    upsert?: QuoteUpsertWithoutInvoiceInput
    disconnect?: QuoteWhereInput | boolean
    delete?: QuoteWhereInput | boolean
    connect?: QuoteWhereUniqueInput
    update?: XOR<XOR<QuoteUpdateToOneWithWhereWithoutInvoiceInput, QuoteUpdateWithoutInvoiceInput>, QuoteUncheckedUpdateWithoutInvoiceInput>
  }

  export type QuoteUncheckedUpdateOneWithoutInvoiceNestedInput = {
    create?: XOR<QuoteCreateWithoutInvoiceInput, QuoteUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutInvoiceInput
    upsert?: QuoteUpsertWithoutInvoiceInput
    disconnect?: QuoteWhereInput | boolean
    delete?: QuoteWhereInput | boolean
    connect?: QuoteWhereUniqueInput
    update?: XOR<XOR<QuoteUpdateToOneWithWhereWithoutInvoiceInput, QuoteUpdateWithoutInvoiceInput>, QuoteUncheckedUpdateWithoutInvoiceInput>
  }

  export type DeviceModelCreateNestedManyWithoutTypeInput = {
    create?: XOR<DeviceModelCreateWithoutTypeInput, DeviceModelUncheckedCreateWithoutTypeInput> | DeviceModelCreateWithoutTypeInput[] | DeviceModelUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutTypeInput | DeviceModelCreateOrConnectWithoutTypeInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
  }

  export type DeviceModelUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<DeviceModelCreateWithoutTypeInput, DeviceModelUncheckedCreateWithoutTypeInput> | DeviceModelCreateWithoutTypeInput[] | DeviceModelUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutTypeInput | DeviceModelCreateOrConnectWithoutTypeInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
  }

  export type DeviceModelUpdateManyWithoutTypeNestedInput = {
    create?: XOR<DeviceModelCreateWithoutTypeInput, DeviceModelUncheckedCreateWithoutTypeInput> | DeviceModelCreateWithoutTypeInput[] | DeviceModelUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutTypeInput | DeviceModelCreateOrConnectWithoutTypeInput[]
    upsert?: DeviceModelUpsertWithWhereUniqueWithoutTypeInput | DeviceModelUpsertWithWhereUniqueWithoutTypeInput[]
    set?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    disconnect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    delete?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    update?: DeviceModelUpdateWithWhereUniqueWithoutTypeInput | DeviceModelUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: DeviceModelUpdateManyWithWhereWithoutTypeInput | DeviceModelUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: DeviceModelScalarWhereInput | DeviceModelScalarWhereInput[]
  }

  export type DeviceModelUncheckedUpdateManyWithoutTypeNestedInput = {
    create?: XOR<DeviceModelCreateWithoutTypeInput, DeviceModelUncheckedCreateWithoutTypeInput> | DeviceModelCreateWithoutTypeInput[] | DeviceModelUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutTypeInput | DeviceModelCreateOrConnectWithoutTypeInput[]
    upsert?: DeviceModelUpsertWithWhereUniqueWithoutTypeInput | DeviceModelUpsertWithWhereUniqueWithoutTypeInput[]
    set?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    disconnect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    delete?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    update?: DeviceModelUpdateWithWhereUniqueWithoutTypeInput | DeviceModelUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: DeviceModelUpdateManyWithWhereWithoutTypeInput | DeviceModelUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: DeviceModelScalarWhereInput | DeviceModelScalarWhereInput[]
  }

  export type DeviceModelCreateNestedManyWithoutBrandInput = {
    create?: XOR<DeviceModelCreateWithoutBrandInput, DeviceModelUncheckedCreateWithoutBrandInput> | DeviceModelCreateWithoutBrandInput[] | DeviceModelUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutBrandInput | DeviceModelCreateOrConnectWithoutBrandInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
  }

  export type DeviceModelUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<DeviceModelCreateWithoutBrandInput, DeviceModelUncheckedCreateWithoutBrandInput> | DeviceModelCreateWithoutBrandInput[] | DeviceModelUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutBrandInput | DeviceModelCreateOrConnectWithoutBrandInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
  }

  export type DeviceModelUpdateManyWithoutBrandNestedInput = {
    create?: XOR<DeviceModelCreateWithoutBrandInput, DeviceModelUncheckedCreateWithoutBrandInput> | DeviceModelCreateWithoutBrandInput[] | DeviceModelUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutBrandInput | DeviceModelCreateOrConnectWithoutBrandInput[]
    upsert?: DeviceModelUpsertWithWhereUniqueWithoutBrandInput | DeviceModelUpsertWithWhereUniqueWithoutBrandInput[]
    set?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    disconnect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    delete?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    update?: DeviceModelUpdateWithWhereUniqueWithoutBrandInput | DeviceModelUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: DeviceModelUpdateManyWithWhereWithoutBrandInput | DeviceModelUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: DeviceModelScalarWhereInput | DeviceModelScalarWhereInput[]
  }

  export type DeviceModelUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<DeviceModelCreateWithoutBrandInput, DeviceModelUncheckedCreateWithoutBrandInput> | DeviceModelCreateWithoutBrandInput[] | DeviceModelUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: DeviceModelCreateOrConnectWithoutBrandInput | DeviceModelCreateOrConnectWithoutBrandInput[]
    upsert?: DeviceModelUpsertWithWhereUniqueWithoutBrandInput | DeviceModelUpsertWithWhereUniqueWithoutBrandInput[]
    set?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    disconnect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    delete?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    connect?: DeviceModelWhereUniqueInput | DeviceModelWhereUniqueInput[]
    update?: DeviceModelUpdateWithWhereUniqueWithoutBrandInput | DeviceModelUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: DeviceModelUpdateManyWithWhereWithoutBrandInput | DeviceModelUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: DeviceModelScalarWhereInput | DeviceModelScalarWhereInput[]
  }

  export type DeviceBrandCreateNestedOneWithoutModelsInput = {
    create?: XOR<DeviceBrandCreateWithoutModelsInput, DeviceBrandUncheckedCreateWithoutModelsInput>
    connectOrCreate?: DeviceBrandCreateOrConnectWithoutModelsInput
    connect?: DeviceBrandWhereUniqueInput
  }

  export type DeviceTypeCreateNestedOneWithoutModelsInput = {
    create?: XOR<DeviceTypeCreateWithoutModelsInput, DeviceTypeUncheckedCreateWithoutModelsInput>
    connectOrCreate?: DeviceTypeCreateOrConnectWithoutModelsInput
    connect?: DeviceTypeWhereUniqueInput
  }

  export type PartCreateNestedManyWithoutModelInput = {
    create?: XOR<PartCreateWithoutModelInput, PartUncheckedCreateWithoutModelInput> | PartCreateWithoutModelInput[] | PartUncheckedCreateWithoutModelInput[]
    connectOrCreate?: PartCreateOrConnectWithoutModelInput | PartCreateOrConnectWithoutModelInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutModelInput = {
    create?: XOR<ServiceCreateWithoutModelInput, ServiceUncheckedCreateWithoutModelInput> | ServiceCreateWithoutModelInput[] | ServiceUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutModelInput | ServiceCreateOrConnectWithoutModelInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type PartUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<PartCreateWithoutModelInput, PartUncheckedCreateWithoutModelInput> | PartCreateWithoutModelInput[] | PartUncheckedCreateWithoutModelInput[]
    connectOrCreate?: PartCreateOrConnectWithoutModelInput | PartCreateOrConnectWithoutModelInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<ServiceCreateWithoutModelInput, ServiceUncheckedCreateWithoutModelInput> | ServiceCreateWithoutModelInput[] | ServiceUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutModelInput | ServiceCreateOrConnectWithoutModelInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type DeviceBrandUpdateOneRequiredWithoutModelsNestedInput = {
    create?: XOR<DeviceBrandCreateWithoutModelsInput, DeviceBrandUncheckedCreateWithoutModelsInput>
    connectOrCreate?: DeviceBrandCreateOrConnectWithoutModelsInput
    upsert?: DeviceBrandUpsertWithoutModelsInput
    connect?: DeviceBrandWhereUniqueInput
    update?: XOR<XOR<DeviceBrandUpdateToOneWithWhereWithoutModelsInput, DeviceBrandUpdateWithoutModelsInput>, DeviceBrandUncheckedUpdateWithoutModelsInput>
  }

  export type DeviceTypeUpdateOneRequiredWithoutModelsNestedInput = {
    create?: XOR<DeviceTypeCreateWithoutModelsInput, DeviceTypeUncheckedCreateWithoutModelsInput>
    connectOrCreate?: DeviceTypeCreateOrConnectWithoutModelsInput
    upsert?: DeviceTypeUpsertWithoutModelsInput
    connect?: DeviceTypeWhereUniqueInput
    update?: XOR<XOR<DeviceTypeUpdateToOneWithWhereWithoutModelsInput, DeviceTypeUpdateWithoutModelsInput>, DeviceTypeUncheckedUpdateWithoutModelsInput>
  }

  export type PartUpdateManyWithoutModelNestedInput = {
    create?: XOR<PartCreateWithoutModelInput, PartUncheckedCreateWithoutModelInput> | PartCreateWithoutModelInput[] | PartUncheckedCreateWithoutModelInput[]
    connectOrCreate?: PartCreateOrConnectWithoutModelInput | PartCreateOrConnectWithoutModelInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutModelInput | PartUpsertWithWhereUniqueWithoutModelInput[]
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutModelInput | PartUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: PartUpdateManyWithWhereWithoutModelInput | PartUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutModelNestedInput = {
    create?: XOR<ServiceCreateWithoutModelInput, ServiceUncheckedCreateWithoutModelInput> | ServiceCreateWithoutModelInput[] | ServiceUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutModelInput | ServiceCreateOrConnectWithoutModelInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutModelInput | ServiceUpsertWithWhereUniqueWithoutModelInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutModelInput | ServiceUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutModelInput | ServiceUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type PartUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<PartCreateWithoutModelInput, PartUncheckedCreateWithoutModelInput> | PartCreateWithoutModelInput[] | PartUncheckedCreateWithoutModelInput[]
    connectOrCreate?: PartCreateOrConnectWithoutModelInput | PartCreateOrConnectWithoutModelInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutModelInput | PartUpsertWithWhereUniqueWithoutModelInput[]
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutModelInput | PartUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: PartUpdateManyWithWhereWithoutModelInput | PartUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<ServiceCreateWithoutModelInput, ServiceUncheckedCreateWithoutModelInput> | ServiceCreateWithoutModelInput[] | ServiceUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutModelInput | ServiceCreateOrConnectWithoutModelInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutModelInput | ServiceUpsertWithWhereUniqueWithoutModelInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutModelInput | ServiceUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutModelInput | ServiceUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type DeviceModelCreateNestedOneWithoutPartsInput = {
    create?: XOR<DeviceModelCreateWithoutPartsInput, DeviceModelUncheckedCreateWithoutPartsInput>
    connectOrCreate?: DeviceModelCreateOrConnectWithoutPartsInput
    connect?: DeviceModelWhereUniqueInput
  }

  export type ServiceCreateNestedManyWithoutPartInput = {
    create?: XOR<ServiceCreateWithoutPartInput, ServiceUncheckedCreateWithoutPartInput> | ServiceCreateWithoutPartInput[] | ServiceUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPartInput | ServiceCreateOrConnectWithoutPartInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutPartInput = {
    create?: XOR<ServiceCreateWithoutPartInput, ServiceUncheckedCreateWithoutPartInput> | ServiceCreateWithoutPartInput[] | ServiceUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPartInput | ServiceCreateOrConnectWithoutPartInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DeviceModelUpdateOneWithoutPartsNestedInput = {
    create?: XOR<DeviceModelCreateWithoutPartsInput, DeviceModelUncheckedCreateWithoutPartsInput>
    connectOrCreate?: DeviceModelCreateOrConnectWithoutPartsInput
    upsert?: DeviceModelUpsertWithoutPartsInput
    disconnect?: DeviceModelWhereInput | boolean
    delete?: DeviceModelWhereInput | boolean
    connect?: DeviceModelWhereUniqueInput
    update?: XOR<XOR<DeviceModelUpdateToOneWithWhereWithoutPartsInput, DeviceModelUpdateWithoutPartsInput>, DeviceModelUncheckedUpdateWithoutPartsInput>
  }

  export type ServiceUpdateManyWithoutPartNestedInput = {
    create?: XOR<ServiceCreateWithoutPartInput, ServiceUncheckedCreateWithoutPartInput> | ServiceCreateWithoutPartInput[] | ServiceUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPartInput | ServiceCreateOrConnectWithoutPartInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPartInput | ServiceUpsertWithWhereUniqueWithoutPartInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPartInput | ServiceUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPartInput | ServiceUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutPartNestedInput = {
    create?: XOR<ServiceCreateWithoutPartInput, ServiceUncheckedCreateWithoutPartInput> | ServiceCreateWithoutPartInput[] | ServiceUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPartInput | ServiceCreateOrConnectWithoutPartInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPartInput | ServiceUpsertWithWhereUniqueWithoutPartInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPartInput | ServiceUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPartInput | ServiceUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type RepairServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<RepairServiceCreateWithoutServiceInput, RepairServiceUncheckedCreateWithoutServiceInput> | RepairServiceCreateWithoutServiceInput[] | RepairServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutServiceInput | RepairServiceCreateOrConnectWithoutServiceInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
  }

  export type PartCreateNestedOneWithoutServicesInput = {
    create?: XOR<PartCreateWithoutServicesInput, PartUncheckedCreateWithoutServicesInput>
    connectOrCreate?: PartCreateOrConnectWithoutServicesInput
    connect?: PartWhereUniqueInput
  }

  export type DeviceModelCreateNestedOneWithoutServicesInput = {
    create?: XOR<DeviceModelCreateWithoutServicesInput, DeviceModelUncheckedCreateWithoutServicesInput>
    connectOrCreate?: DeviceModelCreateOrConnectWithoutServicesInput
    connect?: DeviceModelWhereUniqueInput
  }

  export type RepairServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<RepairServiceCreateWithoutServiceInput, RepairServiceUncheckedCreateWithoutServiceInput> | RepairServiceCreateWithoutServiceInput[] | RepairServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutServiceInput | RepairServiceCreateOrConnectWithoutServiceInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
  }

  export type RepairServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<RepairServiceCreateWithoutServiceInput, RepairServiceUncheckedCreateWithoutServiceInput> | RepairServiceCreateWithoutServiceInput[] | RepairServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutServiceInput | RepairServiceCreateOrConnectWithoutServiceInput[]
    upsert?: RepairServiceUpsertWithWhereUniqueWithoutServiceInput | RepairServiceUpsertWithWhereUniqueWithoutServiceInput[]
    set?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    disconnect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    delete?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    update?: RepairServiceUpdateWithWhereUniqueWithoutServiceInput | RepairServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: RepairServiceUpdateManyWithWhereWithoutServiceInput | RepairServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: RepairServiceScalarWhereInput | RepairServiceScalarWhereInput[]
  }

  export type PartUpdateOneWithoutServicesNestedInput = {
    create?: XOR<PartCreateWithoutServicesInput, PartUncheckedCreateWithoutServicesInput>
    connectOrCreate?: PartCreateOrConnectWithoutServicesInput
    upsert?: PartUpsertWithoutServicesInput
    disconnect?: PartWhereInput | boolean
    delete?: PartWhereInput | boolean
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutServicesInput, PartUpdateWithoutServicesInput>, PartUncheckedUpdateWithoutServicesInput>
  }

  export type DeviceModelUpdateOneWithoutServicesNestedInput = {
    create?: XOR<DeviceModelCreateWithoutServicesInput, DeviceModelUncheckedCreateWithoutServicesInput>
    connectOrCreate?: DeviceModelCreateOrConnectWithoutServicesInput
    upsert?: DeviceModelUpsertWithoutServicesInput
    disconnect?: DeviceModelWhereInput | boolean
    delete?: DeviceModelWhereInput | boolean
    connect?: DeviceModelWhereUniqueInput
    update?: XOR<XOR<DeviceModelUpdateToOneWithWhereWithoutServicesInput, DeviceModelUpdateWithoutServicesInput>, DeviceModelUncheckedUpdateWithoutServicesInput>
  }

  export type RepairServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<RepairServiceCreateWithoutServiceInput, RepairServiceUncheckedCreateWithoutServiceInput> | RepairServiceCreateWithoutServiceInput[] | RepairServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutServiceInput | RepairServiceCreateOrConnectWithoutServiceInput[]
    upsert?: RepairServiceUpsertWithWhereUniqueWithoutServiceInput | RepairServiceUpsertWithWhereUniqueWithoutServiceInput[]
    set?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    disconnect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    delete?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    update?: RepairServiceUpdateWithWhereUniqueWithoutServiceInput | RepairServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: RepairServiceUpdateManyWithWhereWithoutServiceInput | RepairServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: RepairServiceScalarWhereInput | RepairServiceScalarWhereInput[]
  }

  export type InvoiceCreateNestedManyWithoutRepairInput = {
    create?: XOR<InvoiceCreateWithoutRepairInput, InvoiceUncheckedCreateWithoutRepairInput> | InvoiceCreateWithoutRepairInput[] | InvoiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutRepairInput | InvoiceCreateOrConnectWithoutRepairInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type QuoteCreateNestedManyWithoutRepairInput = {
    create?: XOR<QuoteCreateWithoutRepairInput, QuoteUncheckedCreateWithoutRepairInput> | QuoteCreateWithoutRepairInput[] | QuoteUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutRepairInput | QuoteCreateOrConnectWithoutRepairInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
  }

  export type ClientCreateNestedOneWithoutRepairsInput = {
    create?: XOR<ClientCreateWithoutRepairsInput, ClientUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutRepairsInput
    connect?: ClientWhereUniqueInput
  }

  export type RepairLogCreateNestedManyWithoutRepairInput = {
    create?: XOR<RepairLogCreateWithoutRepairInput, RepairLogUncheckedCreateWithoutRepairInput> | RepairLogCreateWithoutRepairInput[] | RepairLogUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairLogCreateOrConnectWithoutRepairInput | RepairLogCreateOrConnectWithoutRepairInput[]
    connect?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
  }

  export type RepairServiceCreateNestedManyWithoutRepairInput = {
    create?: XOR<RepairServiceCreateWithoutRepairInput, RepairServiceUncheckedCreateWithoutRepairInput> | RepairServiceCreateWithoutRepairInput[] | RepairServiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutRepairInput | RepairServiceCreateOrConnectWithoutRepairInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutRepairInput = {
    create?: XOR<InvoiceCreateWithoutRepairInput, InvoiceUncheckedCreateWithoutRepairInput> | InvoiceCreateWithoutRepairInput[] | InvoiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutRepairInput | InvoiceCreateOrConnectWithoutRepairInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type QuoteUncheckedCreateNestedManyWithoutRepairInput = {
    create?: XOR<QuoteCreateWithoutRepairInput, QuoteUncheckedCreateWithoutRepairInput> | QuoteCreateWithoutRepairInput[] | QuoteUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutRepairInput | QuoteCreateOrConnectWithoutRepairInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
  }

  export type RepairLogUncheckedCreateNestedManyWithoutRepairInput = {
    create?: XOR<RepairLogCreateWithoutRepairInput, RepairLogUncheckedCreateWithoutRepairInput> | RepairLogCreateWithoutRepairInput[] | RepairLogUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairLogCreateOrConnectWithoutRepairInput | RepairLogCreateOrConnectWithoutRepairInput[]
    connect?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
  }

  export type RepairServiceUncheckedCreateNestedManyWithoutRepairInput = {
    create?: XOR<RepairServiceCreateWithoutRepairInput, RepairServiceUncheckedCreateWithoutRepairInput> | RepairServiceCreateWithoutRepairInput[] | RepairServiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutRepairInput | RepairServiceCreateOrConnectWithoutRepairInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
  }

  export type InvoiceUpdateManyWithoutRepairNestedInput = {
    create?: XOR<InvoiceCreateWithoutRepairInput, InvoiceUncheckedCreateWithoutRepairInput> | InvoiceCreateWithoutRepairInput[] | InvoiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutRepairInput | InvoiceCreateOrConnectWithoutRepairInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutRepairInput | InvoiceUpsertWithWhereUniqueWithoutRepairInput[]
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutRepairInput | InvoiceUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutRepairInput | InvoiceUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type QuoteUpdateManyWithoutRepairNestedInput = {
    create?: XOR<QuoteCreateWithoutRepairInput, QuoteUncheckedCreateWithoutRepairInput> | QuoteCreateWithoutRepairInput[] | QuoteUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutRepairInput | QuoteCreateOrConnectWithoutRepairInput[]
    upsert?: QuoteUpsertWithWhereUniqueWithoutRepairInput | QuoteUpsertWithWhereUniqueWithoutRepairInput[]
    set?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    disconnect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    delete?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    update?: QuoteUpdateWithWhereUniqueWithoutRepairInput | QuoteUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: QuoteUpdateManyWithWhereWithoutRepairInput | QuoteUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: QuoteScalarWhereInput | QuoteScalarWhereInput[]
  }

  export type ClientUpdateOneRequiredWithoutRepairsNestedInput = {
    create?: XOR<ClientCreateWithoutRepairsInput, ClientUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutRepairsInput
    upsert?: ClientUpsertWithoutRepairsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutRepairsInput, ClientUpdateWithoutRepairsInput>, ClientUncheckedUpdateWithoutRepairsInput>
  }

  export type RepairLogUpdateManyWithoutRepairNestedInput = {
    create?: XOR<RepairLogCreateWithoutRepairInput, RepairLogUncheckedCreateWithoutRepairInput> | RepairLogCreateWithoutRepairInput[] | RepairLogUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairLogCreateOrConnectWithoutRepairInput | RepairLogCreateOrConnectWithoutRepairInput[]
    upsert?: RepairLogUpsertWithWhereUniqueWithoutRepairInput | RepairLogUpsertWithWhereUniqueWithoutRepairInput[]
    set?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    disconnect?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    delete?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    connect?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    update?: RepairLogUpdateWithWhereUniqueWithoutRepairInput | RepairLogUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: RepairLogUpdateManyWithWhereWithoutRepairInput | RepairLogUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: RepairLogScalarWhereInput | RepairLogScalarWhereInput[]
  }

  export type RepairServiceUpdateManyWithoutRepairNestedInput = {
    create?: XOR<RepairServiceCreateWithoutRepairInput, RepairServiceUncheckedCreateWithoutRepairInput> | RepairServiceCreateWithoutRepairInput[] | RepairServiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutRepairInput | RepairServiceCreateOrConnectWithoutRepairInput[]
    upsert?: RepairServiceUpsertWithWhereUniqueWithoutRepairInput | RepairServiceUpsertWithWhereUniqueWithoutRepairInput[]
    set?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    disconnect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    delete?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    update?: RepairServiceUpdateWithWhereUniqueWithoutRepairInput | RepairServiceUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: RepairServiceUpdateManyWithWhereWithoutRepairInput | RepairServiceUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: RepairServiceScalarWhereInput | RepairServiceScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutRepairNestedInput = {
    create?: XOR<InvoiceCreateWithoutRepairInput, InvoiceUncheckedCreateWithoutRepairInput> | InvoiceCreateWithoutRepairInput[] | InvoiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutRepairInput | InvoiceCreateOrConnectWithoutRepairInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutRepairInput | InvoiceUpsertWithWhereUniqueWithoutRepairInput[]
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutRepairInput | InvoiceUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutRepairInput | InvoiceUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type QuoteUncheckedUpdateManyWithoutRepairNestedInput = {
    create?: XOR<QuoteCreateWithoutRepairInput, QuoteUncheckedCreateWithoutRepairInput> | QuoteCreateWithoutRepairInput[] | QuoteUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: QuoteCreateOrConnectWithoutRepairInput | QuoteCreateOrConnectWithoutRepairInput[]
    upsert?: QuoteUpsertWithWhereUniqueWithoutRepairInput | QuoteUpsertWithWhereUniqueWithoutRepairInput[]
    set?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    disconnect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    delete?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    connect?: QuoteWhereUniqueInput | QuoteWhereUniqueInput[]
    update?: QuoteUpdateWithWhereUniqueWithoutRepairInput | QuoteUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: QuoteUpdateManyWithWhereWithoutRepairInput | QuoteUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: QuoteScalarWhereInput | QuoteScalarWhereInput[]
  }

  export type RepairLogUncheckedUpdateManyWithoutRepairNestedInput = {
    create?: XOR<RepairLogCreateWithoutRepairInput, RepairLogUncheckedCreateWithoutRepairInput> | RepairLogCreateWithoutRepairInput[] | RepairLogUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairLogCreateOrConnectWithoutRepairInput | RepairLogCreateOrConnectWithoutRepairInput[]
    upsert?: RepairLogUpsertWithWhereUniqueWithoutRepairInput | RepairLogUpsertWithWhereUniqueWithoutRepairInput[]
    set?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    disconnect?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    delete?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    connect?: RepairLogWhereUniqueInput | RepairLogWhereUniqueInput[]
    update?: RepairLogUpdateWithWhereUniqueWithoutRepairInput | RepairLogUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: RepairLogUpdateManyWithWhereWithoutRepairInput | RepairLogUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: RepairLogScalarWhereInput | RepairLogScalarWhereInput[]
  }

  export type RepairServiceUncheckedUpdateManyWithoutRepairNestedInput = {
    create?: XOR<RepairServiceCreateWithoutRepairInput, RepairServiceUncheckedCreateWithoutRepairInput> | RepairServiceCreateWithoutRepairInput[] | RepairServiceUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairServiceCreateOrConnectWithoutRepairInput | RepairServiceCreateOrConnectWithoutRepairInput[]
    upsert?: RepairServiceUpsertWithWhereUniqueWithoutRepairInput | RepairServiceUpsertWithWhereUniqueWithoutRepairInput[]
    set?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    disconnect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    delete?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    connect?: RepairServiceWhereUniqueInput | RepairServiceWhereUniqueInput[]
    update?: RepairServiceUpdateWithWhereUniqueWithoutRepairInput | RepairServiceUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: RepairServiceUpdateManyWithWhereWithoutRepairInput | RepairServiceUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: RepairServiceScalarWhereInput | RepairServiceScalarWhereInput[]
  }

  export type RepairCreateNestedOneWithoutServicesInput = {
    create?: XOR<RepairCreateWithoutServicesInput, RepairUncheckedCreateWithoutServicesInput>
    connectOrCreate?: RepairCreateOrConnectWithoutServicesInput
    connect?: RepairWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutRepairsInput = {
    create?: XOR<ServiceCreateWithoutRepairsInput, ServiceUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutRepairsInput
    connect?: ServiceWhereUniqueInput
  }

  export type RepairUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<RepairCreateWithoutServicesInput, RepairUncheckedCreateWithoutServicesInput>
    connectOrCreate?: RepairCreateOrConnectWithoutServicesInput
    upsert?: RepairUpsertWithoutServicesInput
    connect?: RepairWhereUniqueInput
    update?: XOR<XOR<RepairUpdateToOneWithWhereWithoutServicesInput, RepairUpdateWithoutServicesInput>, RepairUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceUpdateOneRequiredWithoutRepairsNestedInput = {
    create?: XOR<ServiceCreateWithoutRepairsInput, ServiceUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutRepairsInput
    upsert?: ServiceUpsertWithoutRepairsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutRepairsInput, ServiceUpdateWithoutRepairsInput>, ServiceUncheckedUpdateWithoutRepairsInput>
  }

  export type RepairCreateNestedOneWithoutLogsInput = {
    create?: XOR<RepairCreateWithoutLogsInput, RepairUncheckedCreateWithoutLogsInput>
    connectOrCreate?: RepairCreateOrConnectWithoutLogsInput
    connect?: RepairWhereUniqueInput
  }

  export type RepairUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<RepairCreateWithoutLogsInput, RepairUncheckedCreateWithoutLogsInput>
    connectOrCreate?: RepairCreateOrConnectWithoutLogsInput
    upsert?: RepairUpsertWithoutLogsInput
    connect?: RepairWhereUniqueInput
    update?: XOR<XOR<RepairUpdateToOneWithWhereWithoutLogsInput, RepairUpdateWithoutLogsInput>, RepairUncheckedUpdateWithoutLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type InvoiceCreateWithoutClientInput = {
    id?: string
    number: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    repair?: RepairCreateNestedOneWithoutInvoicesInput
    quote?: QuoteCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutClientInput = {
    id?: string
    number: string
    repairId?: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    quote?: QuoteUncheckedCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutClientInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutClientInput, InvoiceUncheckedCreateWithoutClientInput>
  }

  export type QuoteCreateWithoutClientInput = {
    id?: string
    number: string
    status?: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    repair?: RepairCreateNestedOneWithoutQuotesInput
    invoice?: InvoiceCreateNestedOneWithoutQuoteInput
  }

  export type QuoteUncheckedCreateWithoutClientInput = {
    id?: string
    number: string
    status?: string
    repairId?: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
  }

  export type QuoteCreateOrConnectWithoutClientInput = {
    where: QuoteWhereUniqueInput
    create: XOR<QuoteCreateWithoutClientInput, QuoteUncheckedCreateWithoutClientInput>
  }

  export type RepairCreateWithoutClientInput = {
    id?: string
    status?: string
    partStatus?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutRepairInput
    quotes?: QuoteCreateNestedManyWithoutRepairInput
    logs?: RepairLogCreateNestedManyWithoutRepairInput
    services?: RepairServiceCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateWithoutClientInput = {
    id?: string
    status?: string
    partStatus?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutRepairInput
    quotes?: QuoteUncheckedCreateNestedManyWithoutRepairInput
    logs?: RepairLogUncheckedCreateNestedManyWithoutRepairInput
    services?: RepairServiceUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairCreateOrConnectWithoutClientInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutClientInput, RepairUncheckedCreateWithoutClientInput>
  }

  export type InvoiceUpsertWithWhereUniqueWithoutClientInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutClientInput, InvoiceUncheckedUpdateWithoutClientInput>
    create: XOR<InvoiceCreateWithoutClientInput, InvoiceUncheckedCreateWithoutClientInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutClientInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutClientInput, InvoiceUncheckedUpdateWithoutClientInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutClientInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutClientInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: StringFilter<"Invoice"> | string
    number?: StringFilter<"Invoice"> | string
    clientId?: StringFilter<"Invoice"> | string
    repairId?: StringNullableFilter<"Invoice"> | string | null
    items?: StringFilter<"Invoice"> | string
    totalHT?: FloatFilter<"Invoice"> | number
    totalTTC?: FloatFilter<"Invoice"> | number
    notes?: StringNullableFilter<"Invoice"> | string | null
    paid?: BoolFilter<"Invoice"> | boolean
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    taxDetails?: StringNullableFilter<"Invoice"> | string | null
  }

  export type QuoteUpsertWithWhereUniqueWithoutClientInput = {
    where: QuoteWhereUniqueInput
    update: XOR<QuoteUpdateWithoutClientInput, QuoteUncheckedUpdateWithoutClientInput>
    create: XOR<QuoteCreateWithoutClientInput, QuoteUncheckedCreateWithoutClientInput>
  }

  export type QuoteUpdateWithWhereUniqueWithoutClientInput = {
    where: QuoteWhereUniqueInput
    data: XOR<QuoteUpdateWithoutClientInput, QuoteUncheckedUpdateWithoutClientInput>
  }

  export type QuoteUpdateManyWithWhereWithoutClientInput = {
    where: QuoteScalarWhereInput
    data: XOR<QuoteUpdateManyMutationInput, QuoteUncheckedUpdateManyWithoutClientInput>
  }

  export type QuoteScalarWhereInput = {
    AND?: QuoteScalarWhereInput | QuoteScalarWhereInput[]
    OR?: QuoteScalarWhereInput[]
    NOT?: QuoteScalarWhereInput | QuoteScalarWhereInput[]
    id?: StringFilter<"Quote"> | string
    number?: StringFilter<"Quote"> | string
    status?: StringFilter<"Quote"> | string
    clientId?: StringFilter<"Quote"> | string
    repairId?: StringNullableFilter<"Quote"> | string | null
    items?: StringFilter<"Quote"> | string
    totalHT?: FloatFilter<"Quote"> | number
    totalTTC?: FloatFilter<"Quote"> | number
    notes?: StringNullableFilter<"Quote"> | string | null
    validUntil?: DateTimeNullableFilter<"Quote"> | Date | string | null
    invoiceId?: StringNullableFilter<"Quote"> | string | null
    createdAt?: DateTimeFilter<"Quote"> | Date | string
    updatedAt?: DateTimeFilter<"Quote"> | Date | string
    taxDetails?: StringNullableFilter<"Quote"> | string | null
  }

  export type RepairUpsertWithWhereUniqueWithoutClientInput = {
    where: RepairWhereUniqueInput
    update: XOR<RepairUpdateWithoutClientInput, RepairUncheckedUpdateWithoutClientInput>
    create: XOR<RepairCreateWithoutClientInput, RepairUncheckedCreateWithoutClientInput>
  }

  export type RepairUpdateWithWhereUniqueWithoutClientInput = {
    where: RepairWhereUniqueInput
    data: XOR<RepairUpdateWithoutClientInput, RepairUncheckedUpdateWithoutClientInput>
  }

  export type RepairUpdateManyWithWhereWithoutClientInput = {
    where: RepairScalarWhereInput
    data: XOR<RepairUpdateManyMutationInput, RepairUncheckedUpdateManyWithoutClientInput>
  }

  export type RepairScalarWhereInput = {
    AND?: RepairScalarWhereInput | RepairScalarWhereInput[]
    OR?: RepairScalarWhereInput[]
    NOT?: RepairScalarWhereInput | RepairScalarWhereInput[]
    id?: StringFilter<"Repair"> | string
    status?: StringFilter<"Repair"> | string
    partStatus?: StringFilter<"Repair"> | string
    clientId?: StringFilter<"Repair"> | string
    notes?: StringNullableFilter<"Repair"> | string | null
    createdAt?: DateTimeFilter<"Repair"> | Date | string
    updatedAt?: DateTimeFilter<"Repair"> | Date | string
  }

  export type ClientCreateWithoutQuotesInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    invoices?: InvoiceCreateNestedManyWithoutClientInput
    repairs?: RepairCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutQuotesInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    invoices?: InvoiceUncheckedCreateNestedManyWithoutClientInput
    repairs?: RepairUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutQuotesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutQuotesInput, ClientUncheckedCreateWithoutQuotesInput>
  }

  export type RepairCreateWithoutQuotesInput = {
    id?: string
    status?: string
    partStatus?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutRepairInput
    client: ClientCreateNestedOneWithoutRepairsInput
    logs?: RepairLogCreateNestedManyWithoutRepairInput
    services?: RepairServiceCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateWithoutQuotesInput = {
    id?: string
    status?: string
    partStatus?: string
    clientId: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutRepairInput
    logs?: RepairLogUncheckedCreateNestedManyWithoutRepairInput
    services?: RepairServiceUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairCreateOrConnectWithoutQuotesInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutQuotesInput, RepairUncheckedCreateWithoutQuotesInput>
  }

  export type InvoiceCreateWithoutQuoteInput = {
    id?: string
    number: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    client: ClientCreateNestedOneWithoutInvoicesInput
    repair?: RepairCreateNestedOneWithoutInvoicesInput
  }

  export type InvoiceUncheckedCreateWithoutQuoteInput = {
    id?: string
    number: string
    clientId: string
    repairId?: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
  }

  export type InvoiceCreateOrConnectWithoutQuoteInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutQuoteInput, InvoiceUncheckedCreateWithoutQuoteInput>
  }

  export type ClientUpsertWithoutQuotesInput = {
    update: XOR<ClientUpdateWithoutQuotesInput, ClientUncheckedUpdateWithoutQuotesInput>
    create: XOR<ClientCreateWithoutQuotesInput, ClientUncheckedCreateWithoutQuotesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutQuotesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutQuotesInput, ClientUncheckedUpdateWithoutQuotesInput>
  }

  export type ClientUpdateWithoutQuotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUpdateManyWithoutClientNestedInput
    repairs?: RepairUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutQuotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUncheckedUpdateManyWithoutClientNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutClientNestedInput
  }

  export type RepairUpsertWithoutQuotesInput = {
    update: XOR<RepairUpdateWithoutQuotesInput, RepairUncheckedUpdateWithoutQuotesInput>
    create: XOR<RepairCreateWithoutQuotesInput, RepairUncheckedCreateWithoutQuotesInput>
    where?: RepairWhereInput
  }

  export type RepairUpdateToOneWithWhereWithoutQuotesInput = {
    where?: RepairWhereInput
    data: XOR<RepairUpdateWithoutQuotesInput, RepairUncheckedUpdateWithoutQuotesInput>
  }

  export type RepairUpdateWithoutQuotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutRepairNestedInput
    client?: ClientUpdateOneRequiredWithoutRepairsNestedInput
    logs?: RepairLogUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateWithoutQuotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutRepairNestedInput
    logs?: RepairLogUncheckedUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type InvoiceUpsertWithoutQuoteInput = {
    update: XOR<InvoiceUpdateWithoutQuoteInput, InvoiceUncheckedUpdateWithoutQuoteInput>
    create: XOR<InvoiceCreateWithoutQuoteInput, InvoiceUncheckedCreateWithoutQuoteInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutQuoteInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutQuoteInput, InvoiceUncheckedUpdateWithoutQuoteInput>
  }

  export type InvoiceUpdateWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutInvoicesNestedInput
    repair?: RepairUpdateOneWithoutInvoicesNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClientCreateWithoutInvoicesInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    quotes?: QuoteCreateNestedManyWithoutClientInput
    repairs?: RepairCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutInvoicesInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    quotes?: QuoteUncheckedCreateNestedManyWithoutClientInput
    repairs?: RepairUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutInvoicesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutInvoicesInput, ClientUncheckedCreateWithoutInvoicesInput>
  }

  export type RepairCreateWithoutInvoicesInput = {
    id?: string
    status?: string
    partStatus?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotes?: QuoteCreateNestedManyWithoutRepairInput
    client: ClientCreateNestedOneWithoutRepairsInput
    logs?: RepairLogCreateNestedManyWithoutRepairInput
    services?: RepairServiceCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateWithoutInvoicesInput = {
    id?: string
    status?: string
    partStatus?: string
    clientId: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotes?: QuoteUncheckedCreateNestedManyWithoutRepairInput
    logs?: RepairLogUncheckedCreateNestedManyWithoutRepairInput
    services?: RepairServiceUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairCreateOrConnectWithoutInvoicesInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutInvoicesInput, RepairUncheckedCreateWithoutInvoicesInput>
  }

  export type QuoteCreateWithoutInvoiceInput = {
    id?: string
    number: string
    status?: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    client: ClientCreateNestedOneWithoutQuotesInput
    repair?: RepairCreateNestedOneWithoutQuotesInput
  }

  export type QuoteUncheckedCreateWithoutInvoiceInput = {
    id?: string
    number: string
    status?: string
    clientId: string
    repairId?: string | null
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
  }

  export type QuoteCreateOrConnectWithoutInvoiceInput = {
    where: QuoteWhereUniqueInput
    create: XOR<QuoteCreateWithoutInvoiceInput, QuoteUncheckedCreateWithoutInvoiceInput>
  }

  export type ClientUpsertWithoutInvoicesInput = {
    update: XOR<ClientUpdateWithoutInvoicesInput, ClientUncheckedUpdateWithoutInvoicesInput>
    create: XOR<ClientCreateWithoutInvoicesInput, ClientUncheckedCreateWithoutInvoicesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutInvoicesInput, ClientUncheckedUpdateWithoutInvoicesInput>
  }

  export type ClientUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quotes?: QuoteUpdateManyWithoutClientNestedInput
    repairs?: RepairUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quotes?: QuoteUncheckedUpdateManyWithoutClientNestedInput
    repairs?: RepairUncheckedUpdateManyWithoutClientNestedInput
  }

  export type RepairUpsertWithoutInvoicesInput = {
    update: XOR<RepairUpdateWithoutInvoicesInput, RepairUncheckedUpdateWithoutInvoicesInput>
    create: XOR<RepairCreateWithoutInvoicesInput, RepairUncheckedCreateWithoutInvoicesInput>
    where?: RepairWhereInput
  }

  export type RepairUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: RepairWhereInput
    data: XOR<RepairUpdateWithoutInvoicesInput, RepairUncheckedUpdateWithoutInvoicesInput>
  }

  export type RepairUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotes?: QuoteUpdateManyWithoutRepairNestedInput
    client?: ClientUpdateOneRequiredWithoutRepairsNestedInput
    logs?: RepairLogUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotes?: QuoteUncheckedUpdateManyWithoutRepairNestedInput
    logs?: RepairLogUncheckedUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type QuoteUpsertWithoutInvoiceInput = {
    update: XOR<QuoteUpdateWithoutInvoiceInput, QuoteUncheckedUpdateWithoutInvoiceInput>
    create: XOR<QuoteCreateWithoutInvoiceInput, QuoteUncheckedCreateWithoutInvoiceInput>
    where?: QuoteWhereInput
  }

  export type QuoteUpdateToOneWithWhereWithoutInvoiceInput = {
    where?: QuoteWhereInput
    data: XOR<QuoteUpdateWithoutInvoiceInput, QuoteUncheckedUpdateWithoutInvoiceInput>
  }

  export type QuoteUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutQuotesNestedInput
    repair?: RepairUpdateOneWithoutQuotesNestedInput
  }

  export type QuoteUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeviceModelCreateWithoutTypeInput = {
    id?: string
    name: string
    createdAt?: Date | string
    modelReference?: string | null
    brand: DeviceBrandCreateNestedOneWithoutModelsInput
    parts?: PartCreateNestedManyWithoutModelInput
    services?: ServiceCreateNestedManyWithoutModelInput
  }

  export type DeviceModelUncheckedCreateWithoutTypeInput = {
    id?: string
    name: string
    brandId: string
    createdAt?: Date | string
    modelReference?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutModelInput
    services?: ServiceUncheckedCreateNestedManyWithoutModelInput
  }

  export type DeviceModelCreateOrConnectWithoutTypeInput = {
    where: DeviceModelWhereUniqueInput
    create: XOR<DeviceModelCreateWithoutTypeInput, DeviceModelUncheckedCreateWithoutTypeInput>
  }

  export type DeviceModelUpsertWithWhereUniqueWithoutTypeInput = {
    where: DeviceModelWhereUniqueInput
    update: XOR<DeviceModelUpdateWithoutTypeInput, DeviceModelUncheckedUpdateWithoutTypeInput>
    create: XOR<DeviceModelCreateWithoutTypeInput, DeviceModelUncheckedCreateWithoutTypeInput>
  }

  export type DeviceModelUpdateWithWhereUniqueWithoutTypeInput = {
    where: DeviceModelWhereUniqueInput
    data: XOR<DeviceModelUpdateWithoutTypeInput, DeviceModelUncheckedUpdateWithoutTypeInput>
  }

  export type DeviceModelUpdateManyWithWhereWithoutTypeInput = {
    where: DeviceModelScalarWhereInput
    data: XOR<DeviceModelUpdateManyMutationInput, DeviceModelUncheckedUpdateManyWithoutTypeInput>
  }

  export type DeviceModelScalarWhereInput = {
    AND?: DeviceModelScalarWhereInput | DeviceModelScalarWhereInput[]
    OR?: DeviceModelScalarWhereInput[]
    NOT?: DeviceModelScalarWhereInput | DeviceModelScalarWhereInput[]
    id?: StringFilter<"DeviceModel"> | string
    name?: StringFilter<"DeviceModel"> | string
    brandId?: StringFilter<"DeviceModel"> | string
    typeId?: StringFilter<"DeviceModel"> | string
    createdAt?: DateTimeFilter<"DeviceModel"> | Date | string
    modelReference?: StringNullableFilter<"DeviceModel"> | string | null
  }

  export type DeviceModelCreateWithoutBrandInput = {
    id?: string
    name: string
    createdAt?: Date | string
    modelReference?: string | null
    type: DeviceTypeCreateNestedOneWithoutModelsInput
    parts?: PartCreateNestedManyWithoutModelInput
    services?: ServiceCreateNestedManyWithoutModelInput
  }

  export type DeviceModelUncheckedCreateWithoutBrandInput = {
    id?: string
    name: string
    typeId: string
    createdAt?: Date | string
    modelReference?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutModelInput
    services?: ServiceUncheckedCreateNestedManyWithoutModelInput
  }

  export type DeviceModelCreateOrConnectWithoutBrandInput = {
    where: DeviceModelWhereUniqueInput
    create: XOR<DeviceModelCreateWithoutBrandInput, DeviceModelUncheckedCreateWithoutBrandInput>
  }

  export type DeviceModelUpsertWithWhereUniqueWithoutBrandInput = {
    where: DeviceModelWhereUniqueInput
    update: XOR<DeviceModelUpdateWithoutBrandInput, DeviceModelUncheckedUpdateWithoutBrandInput>
    create: XOR<DeviceModelCreateWithoutBrandInput, DeviceModelUncheckedCreateWithoutBrandInput>
  }

  export type DeviceModelUpdateWithWhereUniqueWithoutBrandInput = {
    where: DeviceModelWhereUniqueInput
    data: XOR<DeviceModelUpdateWithoutBrandInput, DeviceModelUncheckedUpdateWithoutBrandInput>
  }

  export type DeviceModelUpdateManyWithWhereWithoutBrandInput = {
    where: DeviceModelScalarWhereInput
    data: XOR<DeviceModelUpdateManyMutationInput, DeviceModelUncheckedUpdateManyWithoutBrandInput>
  }

  export type DeviceBrandCreateWithoutModelsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type DeviceBrandUncheckedCreateWithoutModelsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type DeviceBrandCreateOrConnectWithoutModelsInput = {
    where: DeviceBrandWhereUniqueInput
    create: XOR<DeviceBrandCreateWithoutModelsInput, DeviceBrandUncheckedCreateWithoutModelsInput>
  }

  export type DeviceTypeCreateWithoutModelsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type DeviceTypeUncheckedCreateWithoutModelsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type DeviceTypeCreateOrConnectWithoutModelsInput = {
    where: DeviceTypeWhereUniqueInput
    create: XOR<DeviceTypeCreateWithoutModelsInput, DeviceTypeUncheckedCreateWithoutModelsInput>
  }

  export type PartCreateWithoutModelInput = {
    id?: string
    name: string
    sku: string
    costPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    supplierRef?: string | null
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    quality?: string | null
    services?: ServiceCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateWithoutModelInput = {
    id?: string
    name: string
    sku: string
    costPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    supplierRef?: string | null
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    quality?: string | null
    services?: ServiceUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartCreateOrConnectWithoutModelInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutModelInput, PartUncheckedCreateWithoutModelInput>
  }

  export type ServiceCreateWithoutModelInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    description?: string | null
    createdAt?: Date | string
    repairs?: RepairServiceCreateNestedManyWithoutServiceInput
    part?: PartCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutModelInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    partId?: string | null
    description?: string | null
    createdAt?: Date | string
    repairs?: RepairServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutModelInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutModelInput, ServiceUncheckedCreateWithoutModelInput>
  }

  export type DeviceBrandUpsertWithoutModelsInput = {
    update: XOR<DeviceBrandUpdateWithoutModelsInput, DeviceBrandUncheckedUpdateWithoutModelsInput>
    create: XOR<DeviceBrandCreateWithoutModelsInput, DeviceBrandUncheckedCreateWithoutModelsInput>
    where?: DeviceBrandWhereInput
  }

  export type DeviceBrandUpdateToOneWithWhereWithoutModelsInput = {
    where?: DeviceBrandWhereInput
    data: XOR<DeviceBrandUpdateWithoutModelsInput, DeviceBrandUncheckedUpdateWithoutModelsInput>
  }

  export type DeviceBrandUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceBrandUncheckedUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTypeUpsertWithoutModelsInput = {
    update: XOR<DeviceTypeUpdateWithoutModelsInput, DeviceTypeUncheckedUpdateWithoutModelsInput>
    create: XOR<DeviceTypeCreateWithoutModelsInput, DeviceTypeUncheckedCreateWithoutModelsInput>
    where?: DeviceTypeWhereInput
  }

  export type DeviceTypeUpdateToOneWithWhereWithoutModelsInput = {
    where?: DeviceTypeWhereInput
    data: XOR<DeviceTypeUpdateWithoutModelsInput, DeviceTypeUncheckedUpdateWithoutModelsInput>
  }

  export type DeviceTypeUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTypeUncheckedUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUpsertWithWhereUniqueWithoutModelInput = {
    where: PartWhereUniqueInput
    update: XOR<PartUpdateWithoutModelInput, PartUncheckedUpdateWithoutModelInput>
    create: XOR<PartCreateWithoutModelInput, PartUncheckedCreateWithoutModelInput>
  }

  export type PartUpdateWithWhereUniqueWithoutModelInput = {
    where: PartWhereUniqueInput
    data: XOR<PartUpdateWithoutModelInput, PartUncheckedUpdateWithoutModelInput>
  }

  export type PartUpdateManyWithWhereWithoutModelInput = {
    where: PartScalarWhereInput
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyWithoutModelInput>
  }

  export type PartScalarWhereInput = {
    AND?: PartScalarWhereInput | PartScalarWhereInput[]
    OR?: PartScalarWhereInput[]
    NOT?: PartScalarWhereInput | PartScalarWhereInput[]
    id?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    sku?: StringFilter<"Part"> | string
    costPrice?: FloatFilter<"Part"> | number
    stock?: IntFilter<"Part"> | number
    minStock?: IntFilter<"Part"> | number
    supplier?: StringNullableFilter<"Part"> | string | null
    supplierRef?: StringNullableFilter<"Part"> | string | null
    location?: StringNullableFilter<"Part"> | string | null
    description?: StringNullableFilter<"Part"> | string | null
    modelId?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    quality?: StringNullableFilter<"Part"> | string | null
  }

  export type ServiceUpsertWithWhereUniqueWithoutModelInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutModelInput, ServiceUncheckedUpdateWithoutModelInput>
    create: XOR<ServiceCreateWithoutModelInput, ServiceUncheckedCreateWithoutModelInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutModelInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutModelInput, ServiceUncheckedUpdateWithoutModelInput>
  }

  export type ServiceUpdateManyWithWhereWithoutModelInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutModelInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    laborCost?: FloatFilter<"Service"> | number
    suggestedPrice?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    partId?: StringNullableFilter<"Service"> | string | null
    modelId?: StringNullableFilter<"Service"> | string | null
    description?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type DeviceModelCreateWithoutPartsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    modelReference?: string | null
    brand: DeviceBrandCreateNestedOneWithoutModelsInput
    type: DeviceTypeCreateNestedOneWithoutModelsInput
    services?: ServiceCreateNestedManyWithoutModelInput
  }

  export type DeviceModelUncheckedCreateWithoutPartsInput = {
    id?: string
    name: string
    brandId: string
    typeId: string
    createdAt?: Date | string
    modelReference?: string | null
    services?: ServiceUncheckedCreateNestedManyWithoutModelInput
  }

  export type DeviceModelCreateOrConnectWithoutPartsInput = {
    where: DeviceModelWhereUniqueInput
    create: XOR<DeviceModelCreateWithoutPartsInput, DeviceModelUncheckedCreateWithoutPartsInput>
  }

  export type ServiceCreateWithoutPartInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    description?: string | null
    createdAt?: Date | string
    repairs?: RepairServiceCreateNestedManyWithoutServiceInput
    model?: DeviceModelCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutPartInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    modelId?: string | null
    description?: string | null
    createdAt?: Date | string
    repairs?: RepairServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutPartInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPartInput, ServiceUncheckedCreateWithoutPartInput>
  }

  export type DeviceModelUpsertWithoutPartsInput = {
    update: XOR<DeviceModelUpdateWithoutPartsInput, DeviceModelUncheckedUpdateWithoutPartsInput>
    create: XOR<DeviceModelCreateWithoutPartsInput, DeviceModelUncheckedCreateWithoutPartsInput>
    where?: DeviceModelWhereInput
  }

  export type DeviceModelUpdateToOneWithWhereWithoutPartsInput = {
    where?: DeviceModelWhereInput
    data: XOR<DeviceModelUpdateWithoutPartsInput, DeviceModelUncheckedUpdateWithoutPartsInput>
  }

  export type DeviceModelUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: DeviceBrandUpdateOneRequiredWithoutModelsNestedInput
    type?: DeviceTypeUpdateOneRequiredWithoutModelsNestedInput
    services?: ServiceUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    typeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    services?: ServiceUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ServiceUpsertWithWhereUniqueWithoutPartInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutPartInput, ServiceUncheckedUpdateWithoutPartInput>
    create: XOR<ServiceCreateWithoutPartInput, ServiceUncheckedCreateWithoutPartInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutPartInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutPartInput, ServiceUncheckedUpdateWithoutPartInput>
  }

  export type ServiceUpdateManyWithWhereWithoutPartInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutPartInput>
  }

  export type RepairServiceCreateWithoutServiceInput = {
    id?: string
    quantity?: number
    priceAtTime: number
    repair: RepairCreateNestedOneWithoutServicesInput
  }

  export type RepairServiceUncheckedCreateWithoutServiceInput = {
    id?: string
    repairId: string
    quantity?: number
    priceAtTime: number
  }

  export type RepairServiceCreateOrConnectWithoutServiceInput = {
    where: RepairServiceWhereUniqueInput
    create: XOR<RepairServiceCreateWithoutServiceInput, RepairServiceUncheckedCreateWithoutServiceInput>
  }

  export type PartCreateWithoutServicesInput = {
    id?: string
    name: string
    sku: string
    costPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    supplierRef?: string | null
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    quality?: string | null
    model?: DeviceModelCreateNestedOneWithoutPartsInput
  }

  export type PartUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    sku: string
    costPrice: number
    stock?: number
    minStock?: number
    supplier?: string | null
    supplierRef?: string | null
    location?: string | null
    description?: string | null
    modelId?: string | null
    createdAt?: Date | string
    quality?: string | null
  }

  export type PartCreateOrConnectWithoutServicesInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutServicesInput, PartUncheckedCreateWithoutServicesInput>
  }

  export type DeviceModelCreateWithoutServicesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    modelReference?: string | null
    brand: DeviceBrandCreateNestedOneWithoutModelsInput
    type: DeviceTypeCreateNestedOneWithoutModelsInput
    parts?: PartCreateNestedManyWithoutModelInput
  }

  export type DeviceModelUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    brandId: string
    typeId: string
    createdAt?: Date | string
    modelReference?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutModelInput
  }

  export type DeviceModelCreateOrConnectWithoutServicesInput = {
    where: DeviceModelWhereUniqueInput
    create: XOR<DeviceModelCreateWithoutServicesInput, DeviceModelUncheckedCreateWithoutServicesInput>
  }

  export type RepairServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: RepairServiceWhereUniqueInput
    update: XOR<RepairServiceUpdateWithoutServiceInput, RepairServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<RepairServiceCreateWithoutServiceInput, RepairServiceUncheckedCreateWithoutServiceInput>
  }

  export type RepairServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: RepairServiceWhereUniqueInput
    data: XOR<RepairServiceUpdateWithoutServiceInput, RepairServiceUncheckedUpdateWithoutServiceInput>
  }

  export type RepairServiceUpdateManyWithWhereWithoutServiceInput = {
    where: RepairServiceScalarWhereInput
    data: XOR<RepairServiceUpdateManyMutationInput, RepairServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type RepairServiceScalarWhereInput = {
    AND?: RepairServiceScalarWhereInput | RepairServiceScalarWhereInput[]
    OR?: RepairServiceScalarWhereInput[]
    NOT?: RepairServiceScalarWhereInput | RepairServiceScalarWhereInput[]
    id?: StringFilter<"RepairService"> | string
    repairId?: StringFilter<"RepairService"> | string
    serviceId?: StringFilter<"RepairService"> | string
    quantity?: IntFilter<"RepairService"> | number
    priceAtTime?: FloatFilter<"RepairService"> | number
  }

  export type PartUpsertWithoutServicesInput = {
    update: XOR<PartUpdateWithoutServicesInput, PartUncheckedUpdateWithoutServicesInput>
    create: XOR<PartCreateWithoutServicesInput, PartUncheckedCreateWithoutServicesInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutServicesInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutServicesInput, PartUncheckedUpdateWithoutServicesInput>
  }

  export type PartUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
    model?: DeviceModelUpdateOneWithoutPartsNestedInput
  }

  export type PartUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeviceModelUpsertWithoutServicesInput = {
    update: XOR<DeviceModelUpdateWithoutServicesInput, DeviceModelUncheckedUpdateWithoutServicesInput>
    create: XOR<DeviceModelCreateWithoutServicesInput, DeviceModelUncheckedCreateWithoutServicesInput>
    where?: DeviceModelWhereInput
  }

  export type DeviceModelUpdateToOneWithWhereWithoutServicesInput = {
    where?: DeviceModelWhereInput
    data: XOR<DeviceModelUpdateWithoutServicesInput, DeviceModelUncheckedUpdateWithoutServicesInput>
  }

  export type DeviceModelUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: DeviceBrandUpdateOneRequiredWithoutModelsNestedInput
    type?: DeviceTypeUpdateOneRequiredWithoutModelsNestedInput
    parts?: PartUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    typeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutModelNestedInput
  }

  export type InvoiceCreateWithoutRepairInput = {
    id?: string
    number: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    client: ClientCreateNestedOneWithoutInvoicesInput
    quote?: QuoteCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutRepairInput = {
    id?: string
    number: string
    clientId: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    paid?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    quote?: QuoteUncheckedCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutRepairInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutRepairInput, InvoiceUncheckedCreateWithoutRepairInput>
  }

  export type QuoteCreateWithoutRepairInput = {
    id?: string
    number: string
    status?: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
    client: ClientCreateNestedOneWithoutQuotesInput
    invoice?: InvoiceCreateNestedOneWithoutQuoteInput
  }

  export type QuoteUncheckedCreateWithoutRepairInput = {
    id?: string
    number: string
    status?: string
    clientId: string
    items: string
    totalHT: number
    totalTTC: number
    notes?: string | null
    validUntil?: Date | string | null
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taxDetails?: string | null
  }

  export type QuoteCreateOrConnectWithoutRepairInput = {
    where: QuoteWhereUniqueInput
    create: XOR<QuoteCreateWithoutRepairInput, QuoteUncheckedCreateWithoutRepairInput>
  }

  export type ClientCreateWithoutRepairsInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    invoices?: InvoiceCreateNestedManyWithoutClientInput
    quotes?: QuoteCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutRepairsInput = {
    id?: string
    name: string
    firstName?: string | null
    lastName?: string | null
    clientType?: string
    email?: string | null
    phone: string
    address?: string | null
    zipCode?: string | null
    city?: string | null
    createdAt?: Date | string
    siret?: string | null
    vatNumber?: string | null
    invoices?: InvoiceUncheckedCreateNestedManyWithoutClientInput
    quotes?: QuoteUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutRepairsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutRepairsInput, ClientUncheckedCreateWithoutRepairsInput>
  }

  export type RepairLogCreateWithoutRepairInput = {
    id?: string
    status: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type RepairLogUncheckedCreateWithoutRepairInput = {
    id?: string
    status: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type RepairLogCreateOrConnectWithoutRepairInput = {
    where: RepairLogWhereUniqueInput
    create: XOR<RepairLogCreateWithoutRepairInput, RepairLogUncheckedCreateWithoutRepairInput>
  }

  export type RepairServiceCreateWithoutRepairInput = {
    id?: string
    quantity?: number
    priceAtTime: number
    service: ServiceCreateNestedOneWithoutRepairsInput
  }

  export type RepairServiceUncheckedCreateWithoutRepairInput = {
    id?: string
    serviceId: string
    quantity?: number
    priceAtTime: number
  }

  export type RepairServiceCreateOrConnectWithoutRepairInput = {
    where: RepairServiceWhereUniqueInput
    create: XOR<RepairServiceCreateWithoutRepairInput, RepairServiceUncheckedCreateWithoutRepairInput>
  }

  export type InvoiceUpsertWithWhereUniqueWithoutRepairInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutRepairInput, InvoiceUncheckedUpdateWithoutRepairInput>
    create: XOR<InvoiceCreateWithoutRepairInput, InvoiceUncheckedCreateWithoutRepairInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutRepairInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutRepairInput, InvoiceUncheckedUpdateWithoutRepairInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutRepairInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutRepairInput>
  }

  export type QuoteUpsertWithWhereUniqueWithoutRepairInput = {
    where: QuoteWhereUniqueInput
    update: XOR<QuoteUpdateWithoutRepairInput, QuoteUncheckedUpdateWithoutRepairInput>
    create: XOR<QuoteCreateWithoutRepairInput, QuoteUncheckedCreateWithoutRepairInput>
  }

  export type QuoteUpdateWithWhereUniqueWithoutRepairInput = {
    where: QuoteWhereUniqueInput
    data: XOR<QuoteUpdateWithoutRepairInput, QuoteUncheckedUpdateWithoutRepairInput>
  }

  export type QuoteUpdateManyWithWhereWithoutRepairInput = {
    where: QuoteScalarWhereInput
    data: XOR<QuoteUpdateManyMutationInput, QuoteUncheckedUpdateManyWithoutRepairInput>
  }

  export type ClientUpsertWithoutRepairsInput = {
    update: XOR<ClientUpdateWithoutRepairsInput, ClientUncheckedUpdateWithoutRepairsInput>
    create: XOR<ClientCreateWithoutRepairsInput, ClientUncheckedCreateWithoutRepairsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutRepairsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutRepairsInput, ClientUncheckedUpdateWithoutRepairsInput>
  }

  export type ClientUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUpdateManyWithoutClientNestedInput
    quotes?: QuoteUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siret?: NullableStringFieldUpdateOperationsInput | string | null
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUncheckedUpdateManyWithoutClientNestedInput
    quotes?: QuoteUncheckedUpdateManyWithoutClientNestedInput
  }

  export type RepairLogUpsertWithWhereUniqueWithoutRepairInput = {
    where: RepairLogWhereUniqueInput
    update: XOR<RepairLogUpdateWithoutRepairInput, RepairLogUncheckedUpdateWithoutRepairInput>
    create: XOR<RepairLogCreateWithoutRepairInput, RepairLogUncheckedCreateWithoutRepairInput>
  }

  export type RepairLogUpdateWithWhereUniqueWithoutRepairInput = {
    where: RepairLogWhereUniqueInput
    data: XOR<RepairLogUpdateWithoutRepairInput, RepairLogUncheckedUpdateWithoutRepairInput>
  }

  export type RepairLogUpdateManyWithWhereWithoutRepairInput = {
    where: RepairLogScalarWhereInput
    data: XOR<RepairLogUpdateManyMutationInput, RepairLogUncheckedUpdateManyWithoutRepairInput>
  }

  export type RepairLogScalarWhereInput = {
    AND?: RepairLogScalarWhereInput | RepairLogScalarWhereInput[]
    OR?: RepairLogScalarWhereInput[]
    NOT?: RepairLogScalarWhereInput | RepairLogScalarWhereInput[]
    id?: StringFilter<"RepairLog"> | string
    repairId?: StringFilter<"RepairLog"> | string
    status?: StringFilter<"RepairLog"> | string
    comment?: StringNullableFilter<"RepairLog"> | string | null
    createdAt?: DateTimeFilter<"RepairLog"> | Date | string
  }

  export type RepairServiceUpsertWithWhereUniqueWithoutRepairInput = {
    where: RepairServiceWhereUniqueInput
    update: XOR<RepairServiceUpdateWithoutRepairInput, RepairServiceUncheckedUpdateWithoutRepairInput>
    create: XOR<RepairServiceCreateWithoutRepairInput, RepairServiceUncheckedCreateWithoutRepairInput>
  }

  export type RepairServiceUpdateWithWhereUniqueWithoutRepairInput = {
    where: RepairServiceWhereUniqueInput
    data: XOR<RepairServiceUpdateWithoutRepairInput, RepairServiceUncheckedUpdateWithoutRepairInput>
  }

  export type RepairServiceUpdateManyWithWhereWithoutRepairInput = {
    where: RepairServiceScalarWhereInput
    data: XOR<RepairServiceUpdateManyMutationInput, RepairServiceUncheckedUpdateManyWithoutRepairInput>
  }

  export type RepairCreateWithoutServicesInput = {
    id?: string
    status?: string
    partStatus?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutRepairInput
    quotes?: QuoteCreateNestedManyWithoutRepairInput
    client: ClientCreateNestedOneWithoutRepairsInput
    logs?: RepairLogCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateWithoutServicesInput = {
    id?: string
    status?: string
    partStatus?: string
    clientId: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutRepairInput
    quotes?: QuoteUncheckedCreateNestedManyWithoutRepairInput
    logs?: RepairLogUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairCreateOrConnectWithoutServicesInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutServicesInput, RepairUncheckedCreateWithoutServicesInput>
  }

  export type ServiceCreateWithoutRepairsInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    description?: string | null
    createdAt?: Date | string
    part?: PartCreateNestedOneWithoutServicesInput
    model?: DeviceModelCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutRepairsInput = {
    id?: string
    name: string
    laborCost: number
    suggestedPrice?: number
    duration?: number
    partId?: string | null
    modelId?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutRepairsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutRepairsInput, ServiceUncheckedCreateWithoutRepairsInput>
  }

  export type RepairUpsertWithoutServicesInput = {
    update: XOR<RepairUpdateWithoutServicesInput, RepairUncheckedUpdateWithoutServicesInput>
    create: XOR<RepairCreateWithoutServicesInput, RepairUncheckedCreateWithoutServicesInput>
    where?: RepairWhereInput
  }

  export type RepairUpdateToOneWithWhereWithoutServicesInput = {
    where?: RepairWhereInput
    data: XOR<RepairUpdateWithoutServicesInput, RepairUncheckedUpdateWithoutServicesInput>
  }

  export type RepairUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUpdateManyWithoutRepairNestedInput
    client?: ClientUpdateOneRequiredWithoutRepairsNestedInput
    logs?: RepairLogUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUncheckedUpdateManyWithoutRepairNestedInput
    logs?: RepairLogUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type ServiceUpsertWithoutRepairsInput = {
    update: XOR<ServiceUpdateWithoutRepairsInput, ServiceUncheckedUpdateWithoutRepairsInput>
    create: XOR<ServiceCreateWithoutRepairsInput, ServiceUncheckedCreateWithoutRepairsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutRepairsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutRepairsInput, ServiceUncheckedUpdateWithoutRepairsInput>
  }

  export type ServiceUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    part?: PartUpdateOneWithoutServicesNestedInput
    model?: DeviceModelUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    partId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairCreateWithoutLogsInput = {
    id?: string
    status?: string
    partStatus?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutRepairInput
    quotes?: QuoteCreateNestedManyWithoutRepairInput
    client: ClientCreateNestedOneWithoutRepairsInput
    services?: RepairServiceCreateNestedManyWithoutRepairInput
  }

  export type RepairUncheckedCreateWithoutLogsInput = {
    id?: string
    status?: string
    partStatus?: string
    clientId: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutRepairInput
    quotes?: QuoteUncheckedCreateNestedManyWithoutRepairInput
    services?: RepairServiceUncheckedCreateNestedManyWithoutRepairInput
  }

  export type RepairCreateOrConnectWithoutLogsInput = {
    where: RepairWhereUniqueInput
    create: XOR<RepairCreateWithoutLogsInput, RepairUncheckedCreateWithoutLogsInput>
  }

  export type RepairUpsertWithoutLogsInput = {
    update: XOR<RepairUpdateWithoutLogsInput, RepairUncheckedUpdateWithoutLogsInput>
    create: XOR<RepairCreateWithoutLogsInput, RepairUncheckedCreateWithoutLogsInput>
    where?: RepairWhereInput
  }

  export type RepairUpdateToOneWithWhereWithoutLogsInput = {
    where?: RepairWhereInput
    data: XOR<RepairUpdateWithoutLogsInput, RepairUncheckedUpdateWithoutLogsInput>
  }

  export type RepairUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUpdateManyWithoutRepairNestedInput
    client?: ClientUpdateOneRequiredWithoutRepairsNestedInput
    services?: RepairServiceUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUncheckedUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type InvoiceUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    repair?: RepairUpdateOneWithoutInvoicesNestedInput
    quote?: QuoteUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quote?: QuoteUncheckedUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuoteUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    repair?: RepairUpdateOneWithoutQuotesNestedInput
    invoice?: InvoiceUpdateOneWithoutQuoteNestedInput
  }

  export type QuoteUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuoteUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    repairId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RepairUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUpdateManyWithoutRepairNestedInput
    logs?: RepairLogUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutRepairNestedInput
    quotes?: QuoteUncheckedUpdateManyWithoutRepairNestedInput
    logs?: RepairLogUncheckedUpdateManyWithoutRepairNestedInput
    services?: RepairServiceUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type RepairUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    partStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceModelUpdateWithoutTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: DeviceBrandUpdateOneRequiredWithoutModelsNestedInput
    parts?: PartUpdateManyWithoutModelNestedInput
    services?: ServiceUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUncheckedUpdateWithoutTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutModelNestedInput
    services?: ServiceUncheckedUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUncheckedUpdateManyWithoutTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeviceModelUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    type?: DeviceTypeUpdateOneRequiredWithoutModelsNestedInput
    parts?: PartUpdateManyWithoutModelNestedInput
    services?: ServiceUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    typeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutModelNestedInput
    services?: ServiceUncheckedUpdateManyWithoutModelNestedInput
  }

  export type DeviceModelUncheckedUpdateManyWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    typeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelReference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PartUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
    services?: ServiceUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
    services?: ServiceUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    supplierRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quality?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairServiceUpdateManyWithoutServiceNestedInput
    part?: PartUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    partId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    partId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairServiceUpdateManyWithoutServiceNestedInput
    model?: DeviceModelUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laborCost?: FloatFieldUpdateOperationsInput | number
    suggestedPrice?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairServiceUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
    repair?: RepairUpdateOneRequiredWithoutServicesNestedInput
  }

  export type RepairServiceUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type RepairServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type InvoiceUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutInvoicesNestedInput
    quote?: QuoteUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quote?: QuoteUncheckedUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuoteUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutQuotesNestedInput
    invoice?: InvoiceUpdateOneWithoutQuoteNestedInput
  }

  export type QuoteUncheckedUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuoteUncheckedUpdateManyWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taxDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RepairLogUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairLogUncheckedUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairLogUncheckedUpdateManyWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairServiceUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
    service?: ServiceUpdateOneRequiredWithoutRepairsNestedInput
  }

  export type RepairServiceUncheckedUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type RepairServiceUncheckedUpdateManyWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ClientCountOutputTypeDefaultArgs instead
     */
    export type ClientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceTypeCountOutputTypeDefaultArgs instead
     */
    export type DeviceTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceBrandCountOutputTypeDefaultArgs instead
     */
    export type DeviceBrandCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceBrandCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceModelCountOutputTypeDefaultArgs instead
     */
    export type DeviceModelCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceModelCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartCountOutputTypeDefaultArgs instead
     */
    export type PartCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceCountOutputTypeDefaultArgs instead
     */
    export type ServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RepairCountOutputTypeDefaultArgs instead
     */
    export type RepairCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RepairCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClientDefaultArgs instead
     */
    export type ClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuoteDefaultArgs instead
     */
    export type QuoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceDefaultArgs instead
     */
    export type InvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceTypeDefaultArgs instead
     */
    export type DeviceTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceBrandDefaultArgs instead
     */
    export type DeviceBrandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceBrandDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceModelDefaultArgs instead
     */
    export type DeviceModelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceModelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartDefaultArgs instead
     */
    export type PartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RepairDefaultArgs instead
     */
    export type RepairArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RepairDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RepairServiceDefaultArgs instead
     */
    export type RepairServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RepairServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RepairLogDefaultArgs instead
     */
    export type RepairLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RepairLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShopProductDefaultArgs instead
     */
    export type ShopProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShopProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkshopSettingsDefaultArgs instead
     */
    export type WorkshopSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkshopSettingsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}