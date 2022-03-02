<template lang="pug">
#questions.h-100
  b-container.py-5
    .self_title 常見問題
    .accordion(role='tablist')
      b-card.mb-1(no-body='')
        b-card-header.p-1(header-tag='header', role='tab')
          b-button(block='', v-b-toggle.accordion-1='', variant='dark') 請問開演後我還可以進場嗎?
        b-collapse#accordion-1(visible='', accordion='my-accordion', role='tabpanel')
          b-card-body
            b-card-text {{ text1 }}
      b-card.mb-1(no-body='')
        b-card-header.p-1(header-tag='header', role='tab')
          b-button(block='', v-b-toggle.accordion-2='', variant='dark') 如果我趕不及放映，那可以參加映後座談嗎?
        b-collapse#accordion-2(accordion='my-accordion', role='tabpanel')
          b-card-body
            b-card-text {{ text2 }}
      b-card.mb-1(no-body='')
        b-card-header.p-1(header-tag='header', role='tab')
          b-button(block='', v-b-toggle.accordion-3='', variant='dark') 為何影展要規定開演後20分鐘不可進場?
        b-collapse#accordion-3(accordion='my-accordion', role='tabpanel')
          b-card-body
            b-card-text {{ text3 }}
      b-card.mb-1(no-body='')
        b-card-header.p-1(header-tag='header', role='tab')
          b-button(block='', v-b-toggle.accordion-4='', variant='dark') 疫情期間進場應配合事項？
        b-collapse#accordion-4(accordion='my-accordion', role='tabpanel')
          b-card-body
            b-card-text
              p
              | 所有放映及影展活動皆為免費，請依影展規定索票入場。
              br
              | ※網路預約索票
              br
              | 1.請至ACCUPASS網站，搜尋「天空影展」，請依各縣市場次登記預約。
              br
              | 2.電影開演前10分鐘開放入場，入場時請出示QR code。
              br
              | 3.若放映開始未報到者，席次將釋出予現場排隊民眾，遲到者請依現場指示入場。
              br
              | ※現場索票入場
              br
              | 1.請於電影開演前30分鐘，於戲院現場影展服務台，排隊索票，額滿為止。
              br
              | 2.電影開演前10分鐘開放入場，入場時請出示實名制票券。
              br
              | 3.入場前需於票根上填寫姓名、電話，請儘早排隊索票。
      b-card.mb-1(no-body='')
        b-card-header.p-1(header-tag='header', role='tab')
          b-button(block='', v-b-toggle.accordion-5='', variant='dark') 請問影展需購票嗎？
        b-collapse#accordion-5(visible='', accordion='my-accordion', role='tabpanel')
          b-card-body
            b-card-text
              p
              | 因應中央流行疫情指揮中心防疫措施，各場館配合防疫措施如下：
              br
              | ※觀影全程須佩戴口罩。
              br
              | ※入場時須配合測量額溫，額溫攝氏37.5度以上者將謝絕入場。
              br
              | ※採實聯制，網路及現場索票時須登記姓名、聯絡電話，僅作為因應可能之疫情調查使用。索票者票券若包含親友票券或出現轉讓情形，日後如接獲疫調聯繫，須盡轉介義務。
              br
              | 為維護影展順利運行，請配合影展工作人員所採取之各種方法，以維護大眾最佳觀影狀況
</template>

<script>
export default {
  data () {
    return {
      text1: '開演後20分無論有沒有票完全不能進場。',
      text2: ' 放映結束後可參加映後座談，入場時須實名制。',
      text3: '因電影節是準點放映，所以20分鐘後電影已經放了1/3，不容易理解影片內容，另外，晚到的觀眾進場找座位時會影響廳內觀眾觀影感受，故影展規定開演後20分不能進場。'
    }
  }
}
</script>
