## 個人記帳本

---

#### 功能描述

- 使用者在首頁可以看到所有的支出資料 (名稱、金額、分類)
- 利用類別尋找支出 (搜尋分類)
- 使用者可以新增、修改、刪除支出資料
- 使用者可以在本地註冊帳號，或是使用 FB 帳號登入

---

#### 環境建置與需求

- 使用框架 express 4.17.1
- 使用樣板引擎 express-handlebars 5.3.3
- 使用資料庫 mongodb
- 安裝
  - 下載專案
    ```
    https://github.com/HUANG-SIH-MAN/expense-tracker.git
    ```
  - 安裝專案
    ```
    $ cd expense-tracker
    $ npm install
    ```
  - 安裝種子資料
    ```
    $ npm run seed
    ```
  - 執行程式
    ```
    $ npm run start
    $ npm run dev
    ```
  - 伺服器位置
    ```
    localhost:3000
    ```

---

#### 種子資料

- 使用者帳號

```
name: 王小明
email: user1@example.com
password: zxcvbn
```

```
name: 王大明
email: user2@example.com
password: asdfgh
```

- 每位使用者預設兩筆支出資料

---

引用資料
書本 icon
https://www.flaticon.com/authors/smashicons

其餘 icon
https://fontawesome.com/
