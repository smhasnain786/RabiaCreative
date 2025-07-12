document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lenis for smooth scrolling
  const initSmoothScrolling = () => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.15,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
  };


  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(TextPlugin)

  initSmoothScrolling();

  const bgColor = getComputedStyle(document.querySelector('.service-content-wrapper')).backgroundColor;
  if (window.innerWidth > 768) {
    const cursor = document.querySelector(".cursor");
    const innerCursor = document.querySelector(".inner-cursor");

    // Set transform center for smoother positioning
    gsap.set([cursor, innerCursor], {
      xPercent: -50,
      yPercent: -50
    });

    // GSAP optimized movement
    const moveCursor = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power2.out" });
    const moveCursorY = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power2.out" });

    const moveInner = gsap.quickTo(innerCursor, "x", { duration: 0.1, ease: "power2.out" });
    const moveInnerY = gsap.quickTo(innerCursor, "y", { duration: 0.1, ease: "power2.out" });

    window.addEventListener("mousemove", (e) => {
      moveCursor(e.clientX);
      moveCursorY(e.clientY);
      moveInner(e.clientX);
      moveInnerY(e.clientY);
    });

    // Hover scaling effect
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(".cursor", { scale: 1.5, duration: 0.2 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(".cursor", { scale: 1, duration: 0.2 });
      });
    });
  } else {
    // Hide cursors on mobile
    const cursor = document.querySelector(".cursor");
    if (cursor) cursor.style.display = "none";
  }



  const brandFull = document.getElementById("brand-full");
  const brandIcon = document.getElementById("brand-icon");
  const preloader = document.getElementById("preloader");
  const r = document.getElementsByClassName("loader-text-chars1");
  const c = document.getElementsByClassName("loader-text-chars6");
  console.log(r, c);

  // const blob = document.querySelector('.blob');

  // window.addEventListener('mousemove', (e) => {
  //   gsap.to(blob, {
  //     x: e.clientX,
  //     y: e.clientY,
  //     ease: 'power3.out',
  //     duration: 10
  //   });
  // });

  const strips = gsap.utils.toArray('.img-strip1');

  strips.forEach((strip, index) => {
    // Duplicate content first
    strip.innerHTML += strip.innerHTML;

    // Wait for all images in this strip to load
    imagesLoaded(strip, () => {
      const totalHeight = strip.scrollHeight / 2; // only original height

      gsap.to(strip, {
        y: index % 2 === 0 ? `-=${totalHeight}px` : `+=${totalHeight}px`,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight)
        }
      });
    });
  });


  let loaderText = SplitText.create("#brand-full", {
    type: "chars",
    charsClass: "loader-text-chars++"
  });

  // Split into lines
  let heroHeading = SplitText.create(".hero-text h1", {
    type: "lines",
    linesClass: "hero-heading-lines"
  });

  // After lines animate, split into chars
  let heroTitleChar = SplitText.create(heroHeading.lines, {
    type: "chars",
    charsClass: "hero-heading-char"
  });


  const tl2 = gsap.timeline();
  console.log(brandFull);
  const windowCenter = window.innerWidth / 2;
  const rBounds = r[0].getBoundingClientRect();
  const rCenter = rBounds.left + rBounds.width / 2;
  const deltaX = windowCenter - rCenter;

  tl2.from(loaderText.chars, {
    delay: 1,
    opacity: 0,
    yPercent: 100,
    ease: "power3.out",
    duration: 0.6,
    stagger: {
      amount: 0.8,
      from: "start"
    }
  })
    .to(loaderText.chars, {
      // opacity: (i) => (i === 0 ? 1 : 0),
      y: (i) => {
        if (i !== 0) {
          return -500;
        }
      },
      duration: 0.5,
      stagger: {
        amount: 0.8,
        from: "end"
      },
      ease: "power1.inOut"
    }, "+=0.3")

    .to(r, {
      x: deltaX,
      duration: 0.8,
      ease: "power4.inOut"
    })
    .to('#brand-full', {
      overflow: "visible",
    })
    .to([r], {
      scale: () => window.innerWidth <= 768 ? 250 : 50,
      duration: 1.2,
      ease: "power4.inOut"
    })
    .to('#preloader', {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1.2,
      ease: "power4.inOut",
    }, '+=0.9')
    // .from('.blob', {
    //   scale: 1,
    //   opacity: 0,
    //   ease: "power3.out",
    //   duration: 1.2,
    //   ease: "power3.out",
    // })
    // .from('.blob2', {
    //   scale: 0,
    //   opacity: 0,
    //   ease: "power3.out",
    //   duration: 1.2,
    //   ease: "power3.out",
    // })
    .from(heroHeading.lines, {
      opacity: 0,
      yPercent: 100,
      ease: "power3.out",
      stagger: {
        amount: 0.8,
        from: "start"
      }
    })


    .from(heroTitleChar.chars, {
      opacity: 0,
      yPercent: 100,
      ease: "power3.out",
      duration: 0.6,
      stagger: {
        amount: 0.8,
        from: "start"
      }
    })
    .from('.img-strip-item1 img', {
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.8,
        from: "start"
      },
      duration: 1.2

    }, 'start')
    .from('.sub-heading', {
      opacity: 0,
    }, 'start')
    // .from('.buttons-div', {
    //   opacity: 0,
    // })
    .from('.navbar', {
      y: -50,
      opacity: 0,
    }, 'start')
  // .from('.strip img', {
  //   y: 50,
  //   opacity: 0,
  //   stagger: {
  //     amount: 0.8,
  //     from: "start"
  //   }
  // })

  let blobtl = gsap.timeline({
    repeat: -1,     // infinite loop
    // yoyo: true,     // reverse after each cycle
    defaults: { duration: 10, ease: "power1.inOut" }
  });

  // blobtl.to('.blob', {

  //   rotation: 360,
  // })


  // const revealTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".service-reveal",
  //     pin: true,
  //     start: "top top",
  //     end: "+=10000", // Fixed scroll distance for animation phases
  //     scrub: 0.5,


  //   },
  // });

  // Animate main heading: fade in with upward movement
  // revealTl.from(".main-heading", {
  //   opacity: 0,
  //   y: 50, // Move up from 50px below
  //   duration: 1.5,
  //   ease: "power2.out"
  // })
  //   .to(".main-heading", {
  //     display: "none",
  //     duration: 0.5,
  //     ease: "power1.in"
  //   }, "+=0.5") // Wait for 0.5 seconds before starting sub-heading animation

  // Split the sub-heading into characters
  const splitText = SplitText.create(".heading2", { type: "chars", charsClass: "heading2-chars++" });
  const chars = splitText.chars; // Array of character elements

  // Make sub-heading visible and animate characters
  // revealTl.set(".heading2", { visibility: "visible" })
  // .from(chars, {
  //   opacity: 0,
  //   duration: 0.3,
  //   stagger: 0.1,
  //   ease: "power1.in",
  //   delay: 0.5
  // }, "+=0.5")
  // .to(".heading2-chars8", {
  //   opacity: 0,
  //   duration: 0.5,
  //   ease: "power1.in",
  //   delay: 0.5,

  // })
  // .to(".heading2", {
  //   x: -365,
  //   duration: 1,
  //   ease: "power2.inOut",
  // })
  // .to(".heading3", {
  //   visibility: "visible",
  //   opacity: 1,
  //   x: 192,
  // })
  // .to('.service-reveal', {
  //   backgroundColor: "#0d1f1d",
  //   ease: "power1.out",
  //   scrollTrigger: {
  //     trigger: '.frame-2',
  //     start: "top center",
  //     end: "bottom center",
  //     scrub: true
  //   }
  // })
  // .from('.thumbnail-slider', {
  //   x: '165rem',
  //   opacity: 0,
  //   duration: 10,
  //   ease: "power2.inOut",
  // })
  // .to(".heading3", {
  //   visibility: "visible",
  //   opacity: 0,
  //   x: -192,
  // })
  // .to(".heading2", {
  //   x: 0,
  //   duration: 1,
  //   ease: "power2.inOut",
  // })
  // .to(chars, {
  //   x: -10,
  //   opacity: 0,
  //   duration: 0.5,
  //   stagger: {
  //     amount: 0.5,
  //     from: "end"
  //   },
  // })
  // .to('.heading4', {
  //   opacity: 1,
  //   visibility: "visible",
  //   duration: 0.3,
  //   stagger: 0.1,
  //   ease: "power1.in",
  //   delay: 0.5
  // })






  if (window.innerWidth > 768) {
    let stl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-strip",
        start: "top top",
        end: "+=1800",
        scrub: 0.5,
      },
      defaults: { ease: "power3.inOut" }
    });
    // stl.to(".service-name", {
    //   color: "white",
    // })
    // Phase 1: Background color change
    stl.to(".service-content-wrapper", {
      backgroundColor: "white",
      ease: "power3.inOut",
      duration: 0.7
    });

    // Phase 2: Scale down overlay
    stl.to(".service-content-wrapper", {
      scale: 0.8,
      duration: 4,         // Smooth and gradual
      ease: "power3.inOut",
    }, "start+=0.5");

    // Phase 3: Parallax img-strip scroll
    stl.to(".img-strip", {
      y: (i) => (i % 2 === 0 ? -window.innerHeight * 0.2 : window.innerHeight * 0.2),
      duration: 10, // slower parallax
      ease: "power1.inOut"
    }, "start+=0.5");

  } else {
    let stl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-strip",
        start: "top top",
        end: "+=1500",
        scrub: 0.5,
      },
    });
    // stl.to(".service-name", {
    //   color: "white",
    // })
    // Phase 1: Background color change
    stl.to(".service-content-wrapper", {
      backgroundColor: "white",
      ease: "power3.inOut",
      duration: 0.7
    });



  }






  const textElements = SplitText.create('.about-text', {
    type: "lines",
    linesClass: "about-lines"
  });
  const aboutHeader = SplitText.create('.about-header', {
    type: "chars",
    charsClass: "about-chars"
  });

  gsap.from(".stat-card", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".matricks",
      start: "top 80%",
    }
  });

  gsap.to(textElements.lines, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-lines',
      start: 'center 80%',
      end: 'center 20%',
      scrub: true,
    },
    stagger: {
      amount: 1,
    },
  });




  const testiTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".testimonial",
      pin: true,
      start: "top top",
      end: "+=2000", // More scroll range
      scrub: 0.5,
      ease: "power3.inOut",
    },
  });

  const testiText = SplitText.create('.testimonil-heading', {
    type: "chars",
    charsClass: "testi-chars"
  });


  testiTl.from(testiText.chars, {
    y: 200,
    // opacity: 0,
    ease: "power3.out",
    stagger: {
      amount: 0.8,
      from: "start"
    },
  })
    .to('.testimonil-heading', {
      scale: 1.2,
      duration: 1.5,
      color: '#dfdfdf',
      ease: "power3.inOut",

    })
    .from(".tesi-card", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 2,
        from: "start"
      }
    })


  const helloText = SplitText.create('.contact-us-heading', {
    type: "chars",
    charsClass: "hello-chars"
  });

  const whyUsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-us",
      pin: true,
      start: "top top",
      end: "+=3000",
      scrub: 0.5,
      ease: "power3.inOut",
    },
  });

  whyUsTl.to('.contact-us', {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power3.inOut",
    duration: 1.5,
    zIndex: 1,
  }, 'a');




  whyUsTl.to('.why-head1', {
    y: -50,
    duration: 1.5,
    ease: "power3.inOut",
  }, 'a');
  whyUsTl.to('.why-head2', {
    x: 100,
    duration: 1.5,
    ease: "power3.inOut",
  }, 'a');

  whyUsTl.to('.why-head3', {
    y: 50,
    duration: 1.5,
    ease: "power3.inOut",
  }, 'a');
  whyUsTl.from(helloText.chars, {
    opacity: 0,
    y: window.innerWidth <= 768 ? -100 : 100,
    delay: 0.5,
    yPercent: 100,
    ease: "power3.out",
    duration: 1,
    stagger: {
      amount: 0.8,
      from: "start"
    }
  }, 'a');
  whyUsTl.from('.email-button', {
    opacity: 0,
    y: -100, // or use yPercent: -100, but not both
    ease: "power3.out",
    duration: 1,
  }, 'a+=1');









});


