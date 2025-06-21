export default function IndexPage() {
  return (
    <section className="about">
      <div className="about__inner">
        <h1 className="about__title">Привіт, я&nbsp;Віталій</h1>
        <p className="about__subtitle">Front-End розробник з України</p>

        <div className="about__content">
          <article className="about__block">
            <h2 className="about__block-title">Хто я</h2>
            <p>
              Я&nbsp;ентузіаст веб-технологій, який обожнює створювати інтерфейси,
              що дарують користувачам задоволення. Сильний у&nbsp;React, Tailwind CSS
              та сучасному JavaScript, люблю перетворювати дизайн на живий,
              відгукливий код.
            </p>
          </article>

          <article className="about__block">
            <h2 className="about__block-title">Чому веб-розробка</h2>
            <p>
              Мене завжди зачаровувала можливість за допомогою кількох рядків коду
              зробити продукт доступним мільйонам. Веб — це місце, де можна швидко
              експериментувати, бачити результат і навчатися щодня, тож вибір був
              очевидний.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

