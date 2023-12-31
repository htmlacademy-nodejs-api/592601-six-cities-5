// enum хороши, но они добавляют немного оверхеда в наш код.
// С одной стороны она позволяет создать синтаксическую конструкцию для нахождения перечисления,
// с другой стороны, в скомпилированном коде мы получаем дополнительную функцию (т.е. небольшое раздувание кода).
// const - это альтернативный подход, помимо enum, чтобы описать перечисления, он появился с версией ts 4-4.5,
// он позволяет делать константный объект. И на выходе мы получим обычный объект Component

export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  FavouritesService: Symbol.for('FavouritesService'),
  FavouritesModel: Symbol.for('FavouritesModel'),
};
