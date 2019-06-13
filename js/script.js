class App {
    constructor(selector) {
        this.selector = selector
        this.isPaused 
        this.render()
        this.addListeners()
        this.rest()
        this.print(this.rest())
    }

    rest() {
        this.times = {
            miliseconds:0, 
            seconds: 0,
            minutes: 0
        }
    }

    addListeners() {
        document.querySelector('.btn-start').addEventListener('click', (e) => {
           e.target.disabled = true;
            document.querySelector('.btn-reset').classList.remove('show');
            document.querySelector('.btn-save').classList.remove('show');
            document.querySelector('.btn-reset-all').classList.remove('show');
            this.isPaused = false;
            this.run();
        });

        document.querySelector('.btn-stop').addEventListener('click', (e) => {
            document.querySelector('.btn-reset').classList.add('show');
            document.querySelector('.btn-save').classList.add('show');
            document.querySelector('.btn-reset-all').classList.add('show');
            document.querySelector('.btn-start').disabled = false;
            this.isPaused = true;
            this.run();
        });

        document.querySelector('.btn-reset').addEventListener('click', (e) => {
            e.target.classList.remove('show');
            this.print(this.rest());
        });

        document.querySelector('.btn-reset-all').addEventListener('click', (e) => {
            document.querySelector('.score-list').innerHTML = '';
        });

        document.querySelector('.btn-save').addEventListener('click', (e) => {
            document.querySelector('.score-list').innerHTML += `<li>${document.querySelector('.stopwatch').innerHTML}</li>`
        });

    }

    render() {
        this.selector.innerHTML = `
            <div class="container">
                <div class="wrapper">
                    <div class="stopwatch"></div>
                    <div class="btn-wrapper">
                        <button id="btn-start" class="btn-start">Start</button>
                        <button id="btn-stop" class="btn-stop">Stop</button>
                        <button id="btn-reset" class="btn-reset">Wyzeruj</button>
                    </div>
                    <ul class="score-list"></ul>
                    <button id="btn-save" class="btn-save">Zapisz wynik</button>
                    <button id="btn-reset-all" class="btn-reset-all">Resetuj Listę wyników</button>
                </div>
            </div>
        `;
    }

    run() { 
        const interval = setInterval(() => {
            if(!this.isPaused) {
                this.calculate();
                this.print();
            } else {
                clearInterval(interval);
            }
        }, 10);    
    }

    calculate() {
        this.times.miliseconds++ ;
        if (this.times.miliseconds >= 100) {
            this.times.seconds++;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes++ ;
            this.times.seconds = 0;
        }
    }

    print() {
        document.querySelector('.stopwatch').innerHTML = this.format(this.times);
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
}

const app = new App(document.querySelector('.app'));