declare module "loopback-crud" {
  export namespace db {
    type Callback<T> = (err?:Error|string, obj?:T) => any;
    type EmptyCallback = (err?: Error) => any;
    type Options = Object;
    type Where = Object;
    type Include = string|string[]|Object|Object[];
    type RemoteCallback<T> = (ctx: any, res: any, next: EmptyCallback) => any;
    type Instance<T> = DataObject<T> & T;

    /**
     * Query filter
     */
    export interface Filter {
      where?:Where, // Matching properties
      limit?:number, // Maximum number of documents to be returned
      offset?:number, // Starting index of documents
      skip?: number, // Alias to offset
      fields?:string[]|Object, // Fields to be included/excluded
      order?:string|string[], // An array of order by
      include?:Include // Related models to be included
    }

    export interface DataAccessObject<T> {
      /**
       *
       * @param data
       * @param options
       * @param callback
       */
      create(data:T, options?: Options, callback?:Callback<Instance<T>>): Promise<Instance<T>>;
      create(data:T[], options?: Options, callback?:Callback<Instance<T>[]>):Promise<Instance<T>[]>;
      /**
       *
       * @param data
       * @param options
       * @param callback
       */
      updateOrCreate(data:T, options?:Options, callback?:Callback<Instance<T>|Instance<T>[]>):any;
      patchOrCreate(data:T, options?:Options, callback?:Callback<Instance<T>|Instance<T>[]>):any;
      upsert(data:T, options?:Options, callback?:Callback<Instance<T>|Instance<T>[]>): any;

      /**
       *
       * @param where
       * @param data
       * @param callback
       */
      upsertWithWhere(where:T, data:T, callback?:Callback<Instance<T>|Instance<T>[]>):any;

      /**
       *
       * @param filter
       * @param data
       * @param options
       * @param callback
       */
      findOrCreate(filter:Filter, data:T, options?:Options, callback?:Callback<Instance<T>[]>):any;

      /**
       *
       * @param data
       * @param options
       * @param callback
       */
      replaceOrCreate(data:T|T[], options?:Options, callback?:Callback<Instance<T>|Instance<T>[]>):any;

      /**
       *
       * @param filter
       * @param options
       * @param callback
       */
      find(filter?:Filter, options?:Options, callback?:Callback<Instance<T>[]>): Promise<Instance<T>[]>;

      /**
       *
       * @param id
       * @param filter
       * @param options
       * @param callback
       */
      findById(id:any, filter?:Filter, options?:Options, callback?:Callback<Instance<T>>): Promise<Instance<T>>;

      /**
       *
       * @param id
       * @param filter
       * @param options
       * @param callback
       */
      findByIds(id:any[], filter?:Filter, options?:Options, callback?:Callback<Instance<T>[]>): Promise<Instance<T>>;

      /**
       *
       * @param filter
       * @param options
       * @param callback
       */
      findOne(filter?:Filter, options?:Options, callback?:Callback<Instance<T>>): Promise<Instance<T>>;
      findOne(filter:Filter, callback:Callback<Instance<T>>): Promise<Instance<T>>;

      /**
       *
       * @param id
       * @param options
       * @param callback
       */
      deleteById(id:any, options?:Options, callback?:Callback<number>): Promise<number>;
      removeById(id:any, options?:Options, callback?:Callback<number>): Promise<number>;
      destroyById(id:any, options?:Options, callback?:Callback<number>): Promise<number>;

      /**
       *
       * @param id
       * @param data
       * @param options
       * @param callback
       */
      updateById(id:any, data:T|Object, options?:Options, callback?:Callback<Instance<T>>): Promise<Instance<T>>;

      /**
       *
       * @param id
       * @param data
       * @param options
       * @param callback
       */
      replaceById(id:any, data:T|Object, options?:Options, callback?:Callback<Instance<T>>): Promise<Instance<T>>;

      /**
       *
       * @param where
       * @param options
       * @param callback
       */
      count(where?:Where, options?:Options, callback?:Callback<number>): Promise<number>;

      /**
       *
       * @param id
       * @param options
       * @param callback
       */
      exists(id:any, options?:Options, callback?:Callback<T>):any;


      update(where?:Where, data?:T, options?:Options, callback?:Callback<T>):any;
      updateAll(where?:Where, data?:T, options?:Options, callback?:Callback<T>):any;

      /**
       *
       * @param where
       * @param options
       * @param callback
       */
      remove(where?:Where, options?:Options, callback?:Callback<number>): Promise<number>;
      removeAll(where?:Where, options?:Options, callback?:Callback<number>): Promise<number>;
      destroyAll(where?:Where, options?:Options, callback?:Callback<number>): Promise<number>;

      /**
       *
       * @param methodName
       * @param config
       */
      remoteMethod(methodName:string, config:Object):any;

      /**
       *
       * @param methodName
       * @param isStatic
       */
      disableRemoteMethod(methodName:string, isStatic:boolean):any;

      /**
       *
       * @param methodName
       * @param callback
       */
      afterRemote(methodName: string, callback?: RemoteCallback<T>): any;

      /**
       *
       * @param name
       * @param callback
       */
      observe(name:string, callback?:(ctx:any, next:EmptyCallback) => any):Promise<any>;

      /**
       *
       * @param name
       * @param callback
       */
      observe(name:string, callback?:(ctx:any, next:EmptyCallback) => any):Promise<any>;

      /**
       *
       * @param name
       * @param listener
       */
      on(name:string, listener:Function);
      app:any;
    }

    /**
     * Instance methods for a data object
     */
    export interface DataObject<T> {
      /**
       *
       * @param options
       * @param callback
       */
      save(options?:Options, callback?:Callback<Instance<T>>): Promise<Instance<T>>;

      /**
       *
       * @param options
       * @param callback
       */
      remove(options?:Options, callback?:Callback<T>):any;
      delete(options?:Options, callback?:Callback<T>):any;
      destroy(options?:Options, callback?:Callback<T>):any;


      /**
       *
       * @param data
       * @param options
       * @param callback
       */
      updateAttribute(attribute: string, options?:Options, callback?:Callback<T>):any;
      updateAttributes(data:T|Object, options?:Options, callback?:Callback<T>):any;
      patchAttributes(data:T|Object, options?:Options, callback?:Callback<T>):any;

      /**
       * Replace the model instance with attributes from the data object
       * @param {T|Object} data Data object keyed by property names
       * @param options
       * @param callback
       */
      replaceAttributes(data:T|Object, options?:Options, callback?:Callback<T>):any;

      /**
       * Create a new database transaction
       * @param type isolation level of the transaction
       * @returns transaction instance
       */
      beginTransaction(type: string): any;

      toObject();
    }
  }
}
