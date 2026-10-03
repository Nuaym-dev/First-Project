/* =========================================================
   NEXORA INTERACTIONS
   ========================================================= */


/* ================= MOBILE NAVIGATION ================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {

    const open = nav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        open
    );

});


document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* ================= SCROLL REVEAL ================= */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


document
    .querySelectorAll(".reveal")
    .forEach(element => {
        revealObserver.observe(element);
    });


/* ================= NUMBER COUNTERS ================= */

const counters = document.querySelectorAll("[data-count]");


const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;

            const target = Number(
                element.dataset.count
            );

            const isDecimal =
                !Number.isInteger(target);

            const duration = 1300;

            const startTime = performance.now();


            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                /*
                 * Ease-out animation.
                 * Starts quickly and slows down near
                 * the final number.
                 */
                const eased =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );


                const value =
                    target * eased;


                element.textContent =
                    isDecimal
                        ? value.toFixed(1)
                        : Math.floor(value);


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                }

            }


            requestAnimationFrame(
                updateCounter
            );


            observer.unobserve(element);

        });

    },
    {
        threshold: 0.7
    }
);


counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* ================= CONTACT FORM ================= */

const form =
    document.getElementById("contactForm");

const formNote =
    document.getElementById("formNote");


form?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        formNote.textContent =
            "Thanks — this demo form is ready to connect to a real backend.";


        form.reset();

    }
);