export default {
    props: ['name'],
    template: `
        <section class="service-category">
            <header class="section-title">
                <hr>
                <h2>{{ name }}</h2>
                <hr>
            </header>
            <div>
                <a href="detailed-services.html" class="item">
                    <div>
                        <img src="assets/images/calendar.svg" alt="Calendário">
                        <h3>Cobertura deeee Eventos</h3>
                        <p>Agilidade e qualidade para cobrir qualquer tipo de evento corporativo e pessoal. Eternize e compartilhe esses momentos com fotos profissionais!</p>
                    </div>
                </a>
                
            </div>
        </section>
    `
}