const popUp2 = (t) => {
  //! Aşağıda siteye girilen alet all ise veya istenen alet ile girildiyse kendisi açısından if blokunun çalışmasına izin veriyor
  let whichDevice =
    "ontouchstart" in document.documentElement ? "mobile" : "desktop";
  let isItOkeyAboutDevice =
    t.visitorDevice == "all" || t.visitorDevice == whichDevice;

  //! Aşağıda hangi sitenen gelenlere popup açılacağı belirtilmemiş ise veya belirtilen site ile gelinen sitenin string hallerinden birisi diğerini içeriyorsa kendisi açısından if blokunun çalışmasına izin veriyor
  let referrerSite = document.referrer;
  let isItOkeyAboutTrafficSource =
    !t.trafficSource ||
    (t.trafficSource &&
      referrerSite.toLowerCase().includes(t.trafficSource.toLowerCase())) ||
    (referrerSite &&
      t.trafficSource.toLowerCase().includes(referrerSite.toLowerCase()));

  //! if bloku ancak yukarıdaki ikisi için de sorun yoksa çalışıyor
  if (isItOkeyAboutDevice && isItOkeyAboutTrafficSource) {
    let modalSize;
    let isVisible =
      t.percentage || t.howManySecondsAfter ? "hidden" : "visible";
    let modalPosition;
    const positionFunction = (position) => {
      let str = position.x + "-" + position.y;
      if (str === "left-top") {
        return "left-3 top-3";
      } else if (str === "center-top") {
        return "left-1/2 -translate-x-1/2 top-3 ";
      } else if (str === "right-top") {
        return "right-3 top-3";
      } else if (str === "left-center") {
        return "left-3  top-1/2 -translate-y-1/2";
      } else if (str === "right-center") {
        return "right-3 top-1/2 -translate-y-1/2";
      } else if (str === "left-bottom") {
        return "left-3 bottom-3";
      } else if (str === "center-bottom") {
        return "left-1/2 -translate-x-1/2 bottom-3";
      } else if (str === "right-bottom") {
        return "right-3 bottom-3";
      } else {
        return "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2";
      }
    };

    modalPosition = positionFunction(t.position);

    if (t.size === "large") {
      modalSize = {
        outerDiv: "h-[32.5rem] w-[25rem]",
        innerDiv: "gap-4 px-12",
      };
    } else if (t.size === "small") {
      modalSize = {
        outerDiv: "h-[26.5rem] w-[20.5rem]",
        innerDiv: "gap-2 px-10",
      };
    } else {
      modalSize = {
        outerDiv: "h-[30rem] w-[23rem]",
        innerDiv: "gap-4 px-12",
      };
    }

    let imgDiv = t.image
      ? `<img src="${t.image}" alt="upper image" class="w-full h-1/2" />`
      : `<img src="https://www.softlanding.ca/wp-content/uploads/2020/04/WM-2.jpg" alt="upper image" class="w-full h-1/2" />`;

    let popDiv = `
    <div
      id='modalWrapper'
      class=" bg-white z-50 rounded-3xl shadow-lg shadow-gray-200 border border-gray-300  overflow-hidden fixed ${isVisible} ${
      modalSize.outerDiv
    } ${modalPosition} "
    >
      ${imgDiv}
      
      <div class="w-ful h-1/2 flex flex-col justify-center items-center ${
        modalSize.innerDiv
      }" >
        <h2 class="font-bold text-3xl">${t.content[0] && t.content[0][1]}</h2>
        <h3 class="text-xl font-medium">${t.content[1] && t.content[1][1]}</h3>
        <button
          id='contine-button'
          class="text-sm font-semibold border border-gray-400  rounded-lg py-3 w-full bg-[${
            t.color
          }] ${
      t.color == "#FFFFFF" || t.color == "#DDDDDD" ? "text-black" : "text-white"
    }"
        >
          ${t.content[2] && t.content[2][1]}
        </button>
        <button
          class="text-sm font-semibold border border-gray-400  rounded-lg py-3 w-full text-black hover:bg-[${
            t.color
          }]  close-button"
        >
          ${t.content[3] && t.content[3][1]}
        </button>
      </div>
      <button class="absolute top-3 right-3 rounded-full close-button">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="gray"
        class="w-8 h-8"
        >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        </svg>
      </button>
    </div>
`;

    let theBody = document.getElementsByTagName("body")[0];
    theBody.innerHTML += popDiv;

    function makeModalHidden() {
      modalWrapper.classList.remove("visible");
      modalWrapper.classList.add("hidden");
    }

    let continueButton = document.getElementById("contine-button");
    let modalWrapper = document.getElementById("modalWrapper");

    continueButton.addEventListener("click", () => {
      //! IT WILL BE WRİTTEN HERE WHAT IS WANTED TO HAPPEN WHEN CLICKED ON THE FORM . BUT I DID NOT ADD IT. BECAUSE WAS NOT WANTED IN THE TASK
      makeModalHidden();
    });

    let closeButtons = document.querySelectorAll(".close-button");

    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        makeModalHidden();
      });
    });

    //! Aşağıdaki isWaitingForTrigger değişkeni istenen saniye geçmesiyle ve istenen scroll yüzdesinin geçmesi iki durumunda da çalışmasını engellemk için. Bir tetikleyince öbürü tetiklemesin diye
    let isWaitingForTrigger = true;

    //! İstenen saniyenin geçmesiyle tetikliyor
    if (t.howManySecondsAfter) {
      let time = parseInt(t.howManySecondsAfter) * 1000;
      setTimeout(() => {
        if (isWaitingForTrigger) {
          modalWrapper.classList.remove("hidden");
          modalWrapper.classList.add("visible");
          isWaitingForTrigger = false;
        }
      }, [time]);
    }

    //! Her yarım saniyede bir scroll u kontrol ediyor. İstenen scroll u geçmişse ve popup tetiklenmedi ise tetikliyor ve interval e son veriyor
    if (t.percentage) {
      let scrollPercentRounded = 0;
      window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight);
        scrollPercentRounded = Math.round(scrollPercent * 100);
      });
      const myInterval = setInterval(checkOutScroll, 500);
      function checkOutScroll() {
        if (!isWaitingForTrigger) {
          clearInterval(myInterval);
        } else if (scrollPercentRounded >= parseInt(t.percentage)) {
          modalWrapper.classList.remove("hidden");
          modalWrapper.classList.add("visible");
          isWaitingForTrigger = false;
          clearInterval(myInterval);
        }
      }
    }
  }

  //! EXIT INTENT TARGETING. Kullanıcı mousu browserın yukarısına götürünce çalışıyor. Aşağılara gittiğinde çalışmıyor. Çünkü gidip dönebilir. Bir de kullanıcıyı sürekli darlamaması için sadece bir defa çalışıyor. İstenildiği üzere sadece desktoplarda çalışıyor
  if (t.exitIntentTargeting && whichDevice !== "mobile") {
    let onMouseOut = (e) => {
      if (e.clientY < 50) {
        document.removeEventListener("mouseout", onMouseOut);
        modalWrapper.classList.remove("hidden");
        modalWrapper.classList.add("visible");
      }
    };
    document.addEventListener("mouseout", onMouseOut);
  }
};
