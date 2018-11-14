# Fergie's Reverse Index
#### This is my reverse index library. There are many like it, but this one is mine.

Throw JavaScript objects at the index. They will be normalised and become retrievable by their properties.


## API

Command   | Options      | Accepts    | Returns    | Writes | Description
--------- | ------------ | ---------- | ---------- | ------ | -----------
`AND`     |              | properties | ids        | no     |
`DELETE`  |              | ids        | ids        | yes    |
`DISTINCT`|              | properties | properties | no     |
`EACH`    |              | properties | ids        | no     |
`GET`     | `gte`, `lte` | properties | ids        | no     |
`MAX`     |              | properties | properties | no     |
`MIN`     |              | properties | properties | no     |
`NOT`     |              | ids        | ids        | no     |
`OBJECT`  |              | ids        | objects    | no     |
`OR`      |              | properties | ids        | no     |
`PUT`     |              | objects    | ids        | yes    |
`STORE`   |              | levelup    | levelup    | both   |
