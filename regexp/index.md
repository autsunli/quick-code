## ?:pattern

* 匹配pattern但不获取匹配结果

## ?=pattern 零宽度正预测先行断言

* 匹配内容右侧必须为pattern

## ?!pattern 零宽度负预测先行断言

* 匹配右侧不是pattern内容

## ?<=pattern

* 匹配这个位置之前为pattern的内容

## ?<!pattern

* 匹配这个位置之前不为pattern的内容

> https://alieasset.meishesdk.com/editor/2021/07/26/video-thumbnail/8a4f8331-d38f-4dc4-bde8-caf1872a61c9/8a4f8331-d38f-4dc4-bde8-caf1872a61c9-0000000.jpg

> https://alieasset.meishesdk.com/editor/2021/07/27/image/ec6d9cae-ab8a-4f0b-898a-3f852a2fe4b4/ec6d9cae-ab8a-4f0b-898a-3f852a2fe4b4-thumbnail.jpg

>.match(/(\/(?:video-thumbnail\b|image\b)\/.*)-([^-]+)\./)[2]