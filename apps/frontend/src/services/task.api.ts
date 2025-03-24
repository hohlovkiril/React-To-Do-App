export class TaskApi {
  public static async getOne(taskId: number | string) {
    try {
      const req = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: 'GET',
      });

      if (!req.ok) {
        throw new Error(`Request failed: ${req.statusText}`);
      }

      const res = await req.json();

      if (res.statusCode) {
        throw new Error(`Request failed - ${res.message}`);
      }
      
      return res;
    } catch (err) {
      throw new Error(`Error fetch data: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }
  public static async getMany(columnId?: number) {
    try {
      
      const req = await fetch(`http://localhost:3000/api/task${columnId !== undefined ? '?columnId=' + columnId : ''}`, {
        method: 'GET',
      });

      if (!req.ok) {
        throw new Error(`Request failed: ${req.statusText}`);
      }

      const res = await req.json();

      if (res.statusCode) {
        throw new Error(`Request failed - ${res.message}`);
      }
      
      return res;
    } catch (err) {
      throw new Error(`Error fetch data: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }
  public static async create(payload: {
    title: string,
    viewIndex: number,
    columnId: number,
  }) {
    try {
      const req = await fetch(`http://localhost:3000/api/task`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload),
      });

      if (!req.ok) {
        throw new Error(`Request failed: ${req.statusText}`);
      }

      const res = await req.json();

      if (res.statusCode) {
        throw new Error(`Request failed - ${res.message}`);
      }
      
      return res;
    } catch (err) {
      throw new Error(`Error fetch data: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }
  public static async update(
    taskId: number | string,
    payload: {
      title?: string;
      description?: string;
      viewIndex?: number;
      priority?: number;
      dueDate?: Date;
      columnId?: number;
    }
  ) {
    try {
      const req = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload),
      });

      if (!req.ok) {
        throw new Error(`Request failed: ${req.statusText}`);
      }

      const res = await req.json();

      if (res.statusCode) {
        throw new Error(`Request failed - ${res.message}`);
      }
      
      return res;
    } catch (err) {
      throw new Error(`Error fetch data: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }
  public static async remove(taskId: number | string) {
    try {
      const req = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: 'DELETE',
      });

      if (!req.ok) {
        throw new Error(`Request failed: ${req.statusText}`);
      }

      const res = await req.json();

      if (res.statusCode) {
        throw new Error(`Request failed - ${res.message}`);
      }
      
      return res;
    } catch (err) {
      throw new Error(`Error fetch data: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }
}