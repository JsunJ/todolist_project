const Todo = require('../lib/todo');
const TodoList = require('..lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo item', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first todo item', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes and returns the last todo item', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone returns true when all items are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
  });

  test('add raises a TypeError when adding a non Todo item', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
    expect(() => list.add({})).toThrow(TypeError);
    expect(() => list.add(new TodoList)).toThrow(TypeError);
  });

  test('itemAt returns the item at the given index', () => {
    expect(() => list.itemAt(3)).toThrow(ReferenceError);

    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(2)).toEqual(todo3);
  });

  test('markDoneAt marks the item at the given index as done', () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);

    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
  });

  test('markUndoneAt marks the item at the given index as not done', () => {
    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);

    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
  });

  test('markAllDone marks all todos in the list as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('markAllUndone marks all todos in the list as not done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);

    list.markAllUndone();
    expect(list.isDone()).toBe(false);
  })

  test('removeAt removes the todo item at the given index', () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);

    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('toString returns different string when one todo is done', () => {
    list.markDoneAt(1);
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('toString returns different string when all todos are done', () => {
    list.markAllDone();
    let string = `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over the elements in list', () => {
    let array = [];
    list.forEach((element) => array.push(element.getTitle()));
    let titlesString = array.join(', ');
    expect(titlesString).toEqual('Buy milk, Clean room, Go to the gym');
  });

  test('filter returns a new TodoList of filtered todos', () => {
    list.markDoneAt(1);
    let list2 = list.filter((element) => element.isDone());
    expect(list2.toArray()).toEqual([todo2]);
  });

  test('findByTitle returns the first todo in the list matching the given title', () => {
    expect(list.findByTitle('Go to the gym')).toEqual(todo3);
    expect(list.findByTitle('does not exist')).toBe(undefined);
  });

  test('allDone returns a new TodoList of the done todos', () => {
    let list2 = list.allDone();
    expect(list2.toArray()).toEqual([]);

    list.markDoneAt(2);
    let list3 = list.allDone();
    expect(list3.toArray()).toEqual([todo3]);
  });

  test('allNotDone returns a new TodoList of the not done todos', () => {
    let list2 = list.allNotDone();
    expect(list2.toArray()).toEqual([todo1, todo2, todo3]);

    list.markDoneAt(2);
    let list3 = list.allNotDone();
    expect(list3.toArray()).toEqual([todo1, todo2]);
  });

  test('markDone marks the first todo for a given title as done', () => {
    expect(list.findByTitle('Buy milk').isDone()).toBe(false);
    list.markDone('Buy milk');
    expect(list.findByTitle('Buy milk').isDone()).toBe(true);
  });
});