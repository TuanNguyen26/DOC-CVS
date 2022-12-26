---
title: 'Face Search'
metaTitle: 'Face Search'
metaDescription: 'This is the api v1 for this page'
stt: 32
---

#### 1. Xem toàn bộ ảnh

**API:**

| Method | URL                                                                                     |
| ------ | --------------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/face_search/get_all_images` |

**Params**:

| Key      | Value | Mô tả                       |
| -------- | ----- | --------------------------- |
| `offset` | 100   | số bản ghi sẽ bỏ qua        |
| `limit`  | 50    | số bản ghi tối đa sẽ trả về |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

offset = 100
limit = 50

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/face_search/get_all_images?offset=%s&limit=%s"
  % (offset, limit),
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 2. Tìm kiếm khuôn mặt

**API**:

| Method | URL                                                                             | content-type       |
| ------ | ------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_search/search` | `application/json` |

**Body**:

```json
{
  "image": {
    "base64": string
  }
}
```

Trong đó:

| Key      | Type        | Bắt buộc | Mô tả                      |
| -------- | ----------- | -------- | -------------------------- |
| `image`  | `ImageData` | có       | ảnh dùng để tìm kiếm       |
| `base64` | `string`    | có       | mã hoá base64 của hình ảnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image\":{\"base64\":\"iVBORw0KGgoAAAANSU...\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/face_search/search",
  auth=(api_key, api_secret),
  data = payload

print(response.json())
```

#### 3. Thêm ảnh

**API**:

| Method | URL                                                                          | content-type       |
| ------ | ---------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_search/add` | `application/json` |

**Body**:

```json
{
  "image": {
    "base64": string,
    "metadata": json
  }
}
```

Trong đó:

| Key        | Type         | Bắt buộc | Mô tả                                                                         |
| ---------- | ------------ | -------- | ----------------------------------------------------------------------------- |
| `image`    | `ImageData`  | có       | ảnh muốn thêm                                                                 |
| `base64`   | `string`     | có       | mã hoá base64 của hình ảnh                                                    |
| `metadata` | `dictionary` | không    | bất kỳ metadata key-value nào để lưu cùng với ảnh, key và value ở dạng string |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image\":{\"base64\":\"iVBORw0KGgoAAAANSU...\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/face_search/add",
    auth=(api_key, api_secret),
    data = payload

print(response.json())
```

#### 4. Cập nhật metadata

**API**:

| Method | URL                                                                                    | content-type       |
| ------ | -------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_search/edit_metadata` | `application/json` |

**Body**:

```json
{
  "image_id": 123456,
  "metadata": {
    "name": "example",
    "label": "for bar"
    ...
  }
}
```

| Key        | Bắt buộc | Mô tả                                                                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `image_id` | có       | id ảnh cần cập nhật metadata                                                                                              |
| `metadata` | không    | bất kỳ metadata key-value nào để lưu cùng với ảnh, trừ những key `"user"`, `"encoding"`, `"_id"` đã được hệ thống sử dụng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image_id\":123456,\"metadata\":{\"name\":\"example\",\"label\":\"for bar\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/face_search/edit_metadata",
  data = payload,
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 5. Xoá nhiều ảnh

**API**:

| Method | URL                                                                             | content-type       |
| ------ | ------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_search/delete` | `application/json` |

**Body**:

```json
{
  "ids": [
    123456, // id ảnh cần xoá
    987654, // id ảnh cần xoá
    ...
  ]
}
```

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"ids\":[<image-id-you-want-to-delete>,<image-id-you-want-to-delete>,...]}"

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/face_search/delete",
  data = payload,
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 6. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "result": [xxxx],
  "status_code": int, // mã lỗi
  "message": string // thông báo lỗi
}
```

Mỗi api khác nhau sẽ trả về kết quả khác nhau.

Xem toàn bộ ảnh.

```javascript
    - `result` : mảng chứa các phần tử ảnh, mỗi phần tử gồm id của ảnh và url ảnh tương ứng
    <!-- - `origin_image`: `Get all images` -->
```

Tìm kiếm khuôn mặt.

```javascript
    - `result` : Mảng chứa các phần tử ảnh phù hợp, mỗi phần tử gồm id của ảnh và url ảnh tương ứng
    <!-- - `origin_image`:Url ảnh trong trường hợp `GET`, `Upload` trong trường hợp `POST` -->
```

Thêm ảnh.

```javascript
    - `result` : Json chứa thông tin ảnh mới được thêm vào
    <!-- - `origin_image`: `Add` -->
```

Xoá nhiều ảnh.

```javascript
    - `result` : `None`
    <!-- - `origin_image`: `Delete` -->
```

Bảng mã lỗi:

| Mã lỗi | Message                            |
| ------ | ---------------------------------- |
| 0      | Thành công                         |
| 1      | Ảnh sai format                     |
| 2      | Url của ảnh không khả dụng         |
| 3      | Ảnh không chứa nội dung            |
| 4      | Api_key hoặc api_secret không đúng |
| 5      | Hết số lượng request hữu dụng      |
| 6      | Lỗi khi thực hiện truy vấn         |
| 7      | Id không hợp lệ                    |
