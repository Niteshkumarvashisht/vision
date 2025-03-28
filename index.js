document.addEventListener("DOMContentLoaded", function () {
    // Select nav safely
    var nav = document.querySelector("nav");
    if (!nav) {
        console.warn("No <nav> element found!");
    }

    // GSAP animations
    gsap.to(".videodiv", {
        scrollTrigger: {
            trigger: ".videodiv",
            start: "top 60%",
            end: "bottom 20%",
            scroller: ".main",
            scrub: 1,
            markers: false,
        },
        width: "90%",
        height: "75%"
    });

    gsap.to(".main", {
        scrollTrigger: {
            trigger: ".videodiv",
            start: "bottom 60%",
            end: "bottom -10%",
            scroller: ".main",
            scrub: 1,
            markers: false,
        },
        backgroundColor: "#000000f0",
    });

    gsap.to(nav, {
        scrollTrigger: {
            trigger: ".videodiv",
            start: "top 60%",
            end: "bottom 20%",
            scroller: ".main",
            scrub: 1,
            markers: false,
        },
        backgroundColor: "#ffffff",
        height: "8vh"
    });

    gsap.to(".videodiv1", {
        scrollTrigger: {
            trigger: ".videodiv1",
            start: "top 60%",
            end: "bottom 20%",
            scroller: ".main",
            scrub: 1,
            markers: false,
        },
        width: "90%",
        height: "75%"
    });

    function canvas1() {
        const canvas = document.querySelector(".PAGE5>canvas");
        const context = canvas.getContext("2d");
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        }

        // Debounce resize event
        let resizeTimer;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeCanvas, 200);
        });

        function files(index) {
            let data = `
                ./Vision00001.png
                ./Vision00002.png
                ./Vision00003.png
                ./Vision00004.png
                ./Vision00005.png
                ./Vision00006.png
                ./Vision00007.png
                ./Vision00008.png
                ./Vision00009.png
                ./Vision00010.png
                ./Vision00011.png
                ./Vision00012.png
                ./Vision00013.png
                ./Vision00014.png
                ./Vision00015.png
                ./Vision00016.png
                ./Vision00017.png
                ./Vision00018.png
                ./Vision00019.png
                ./Vision00020.png
                ./Vision00021.png
                ./Vision00022.png
                ./Vision00023.png
                ./Vision00024.png
                ./Vision00025.png
            `.trim().split("\n").map(str => str.trim());
            
            return data[index] || "";
        }

        const frameCount = 25;
        const images = [];
        const imageSeq = { frame: 1 };

        function preloadImages() {
            return new Promise((resolve) => {
                let loaded = 0;
                for (let i = 0; i < frameCount; i++) {
                    images[i] = new Image();
                    images[i].src = files(i);
                    images[i].onload = () => {
                        loaded++;
                        if (loaded === frameCount) resolve();
                    };
                }
            });
        }

        function render() {
            scaleImage(images[imageSeq.frame], context);
        }

        function scaleImage(img, ctx) {
            var canvas = ctx.canvas;
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.max(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width * ratio) / 2;
            var centerShift_y = (canvas.height - img.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        }

        preloadImages().then(() => {
            images[0].onload = render;
        });

        gsap.to(imageSeq, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                scrub: 0.15,
                trigger: ".PAGE5",
                start: "top top",
                end: "90% top",
                scroller: ".main",
            },
            onUpdate: render,
        });

        ScrollTrigger.create({
            trigger: ".PAGE5",
            pin: true,
            scroller: ".main",
            start: "top top",
            end: "70% top",
        });
    }
    
    canvas1();
});