# Yett back-end server

## 描述

Yett小程序后端



## 模型

### user

| `id`     | `openid`           |
| :------- | :----------------- |
| `用户id` | `用户的openid标识` |

### tasks

| `id`     | `content`  | `expire_time` | `create_time` | `is_finished` | `is_expired` | `user_id` |
| -------- | ---------- | ------------- | ------------- | ------------- | ------------ | --------- |
| `任务id` | `任务内容` | `逾期时间`    | `创建时间`    | `完成与否`    | `逾期与否`   | `用户id`  |

## 接口

### user

登录创建用户

`GET /api/login/:code`

查询用户id

`GET /api/user/:user_open_id`

### tasks

创建新任务

`POST /api/tasks`

```json
body: {
    "content": "task_content",
    "expireTime": "expire_time"
}
```

标记任务完成

`PUT /api/tasks/:id`

```json
body : {
   	"mark": "finished"
}
```

标记任务逾期

`PUT /api/tasks/:id`

```json
body: {
    "mark": "expired"
}	
```

获取今日任务

`GET /api/tasks?sort=today&limit=&offset=`

获取历史任务

`GET /api/tasks?sort=all&limit=&offset=`

获取逾期任务

`GET /api/tasks?sort=expired&limit=&offset=`

获取已完成任务

`GET /api/tasks?sort=finished&limit=&offset=`

删除任务

`GET /api/tasks/:id`