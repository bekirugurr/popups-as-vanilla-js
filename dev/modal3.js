const popUp3 = (t) => {
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
    let whichIsChecked = 0;
    let colorState = { text: "text-[#000000]", accent: "accent-[#000000]" };
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
        outerDiv: "h-[31.5rem] w-[26rem] gap-6 pb-4",
        form: "gap-6",
      };
    } else if (t.size === "small") {
      modalSize = {
        outerDiv: "h-[26.5rem] w-[21rem] gap-4",
        form: "gap-3",
      };
    } else {
      modalSize = {
        outerDiv: "h-[29rem] w-[23rem] gap-4 pb-4",
        form: "gap-4",
      };
    }

    if (t.color === "#7D4AEA") {
      colorState = { text: "text-[#7D4AEA]", accent: "accent-[#7D4AEA]" };
    } else if (t.color === "#F37C34") {
      colorState = { text: "text-[#F37C34]", accent: "accent-[#F37C34]" };
    } else if (t.color === "#DDDDDD") {
      colorState = { text: "text-[#DDDDDD]", accent: "accent-[#DDDDDD]" };
    }

    let inputsContent = ``;
    {
      t.content[8] &&
        [
          [t.content[3], t.content[4]],
          [t.content[5], t.content[6]],
          [t.content[7], t.content[8]],
        ].forEach(
          (item, index) =>
            (inputsContent += `<div key=${index}>
        <label
            
            htmlFor=${item[0][0]}
            class="flex items-center font-semibold input-radio-label"
        >
            <input
            type="radio"
            name="campaign"
            id=${item[0][0]}
            class="mr-3 w-6 h-6 ${colorState.accent}"
            ${index == 0 && "checked"}
            />
            ${item[0][1]}
        </label>
        <div class="ml-9 text-xs">${item[1][1]}</div>
        </div>
        `)
        );
    }

    let popDiv = `
    <div
      id='modalWrapper'
      class=" bg-white z-50 rounded-3xl shadow-lg shadow-gray-200 border border-gray-300  overflow-hidden flex flex-col justify-center items-center px-6 fixed ${isVisible} ${
      modalSize.outerDiv
    } ${modalPosition}"
    >
        <h3 class="font-lg font-medium text-center text-lg ${colorState.text}">
        ${t.content[0] && t.content[0][1].toUpperCase()}
        </h3>
        <h2 class="text-center  font-bold text-3xl">
            ${t.content[1] && t.content[1][1]}
        </h2>
        <h3 class="text-center  text-xl font-normal">
            ${t.content[2] && t.content[2][1]}
        </h3>

        <form id='popUpForm' class="px-4 flex flex-col w-full  ${
          modalSize.form
        }">

        ${inputsContent}

        <div class="flex gap-4">
          <button
            class="text-sm font-semibold border border-gray-400  rounded-lg py-3 w-full text-black hover:bg-[${
              t.color
            }] close-button"
          >
            ${t.content[9] && t.content[9][1]}
          </button>
          <button
            type="submit"
            class="text-sm font-semibold border border-gray-400  rounded-lg py-3 w-full bg-[${
              t.color
            }] ${
      t.color == "#FFFFFF" || t.color == "#DDDDDD" ? "text-black" : "text-white"
    }"
          >
            ${t.content[10] && t.content[10][1]}
          </button>
        </div>
        </form>
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

    let modalWrapper = document.getElementById("modalWrapper");

    popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(
        `User selected ${
          ["Starter", "Pro", "Business"][whichIsChecked]
        } package and submitted....`
      );
      //! IT WILL BE WRİTTEN HERE WHAT IS WANTED TO HAPPEN WHEN CLICKED ON THE FORM . BUT I DID NOT ADD IT. BECAUSE WAS NOT WANTED IN THE TASK
      makeModalHidden();
    });

    let closeButtons = document.querySelectorAll(".close-button");

    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        makeModalHidden();
      });
    });

    let inputRadioLabels = document.querySelectorAll(".input-radio-label");

    inputRadioLabels.forEach((label, index) => {
      label.addEventListener("click", () => {
        whichIsChecked = index;
        console.log(
          `User changed to radio to ${
            ["Starter", "Pro", "Business"][whichIsChecked]
          } package`
        );
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
