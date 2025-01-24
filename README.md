# Тестовое задание

Для работы нужен PostgressSQL.

Ниже скрипт для создания таблицы product
```
-- Table: public.product
-- DROP TABLE IF EXISTS public.product;

CREATE TABLE IF NOT EXISTS public.product
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    price money DEFAULT 0,
    "priceWithDiscount" money DEFAULT 0,
    sku text COLLATE pg_catalog."default" NOT NULL,
    photo uuid,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product
    OWNER to avnadmin;
```

### Запуск

```
  git clone https://github.com/fyodor-e/tc.git
```

Для работы backend необходим `tc\backend\.env` файл с  следующими параметрами
```
  POSTGRESS_URI=<строка полключения>
  FILES_STORE=.\\files
  NODE_TLS_REJECT_UNAUTHORIZED=0
```

Запуск backend
```
  cd tc\backend
  npm i
  npm run start
```

Запуск frontend
```
  cd tc\frontend
  npm i
  npm run dev
```

Ограничения (в реальном проекте все это может быть реализовано):
  - Простой интерфейс (минимальная стилизация)
  - Нет тестов
  - Нет лоадеров
  - Фильтры, сортировка и пагинация без useState'a (немного подтормаживает)