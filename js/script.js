window.addEventListener('DOMContentLoaded', () => {
	 //scroll
		// const anchors = document.querySelectorAll('a[href*="#"]');
		// for (let anchor of anchors) {
		//     anchor.addEventListener('click', (e) => {
		//         e.preventDefault();
		//         const blockID = anchor.getAttribute('href');
		//         document.querySelector('' + blockID).scrollIntoView ({
		//             behavior: "smooth",
		//             block: "start"               
		//         });
		//     });
		// }
	  
	  
	  
	
		//scrollUp
		const offset = 100,
			scrollUp = document.querySelector('.scroll-up'),
			scrollUpSvgPatch = document.querySelector('.scroll-up__svg-path');
			pathLength = scrollUpSvgPatch.getTotalLength();
	  
			scrollUpSvgPatch.style.strokeDasharray = `${pathLength} ${pathLength}`;
			scrollUpSvgPatch.style.transition = 'stroke-dashoffset 20ms';
	  
			const getTop = () => window.pageYOffset || document.documentElement.scrollTop;
			// const getTop = () => window.scrollY || document.documentElement.scrollTop;
	  
			//updateDashoffset
			const updateDashoffset = () => {
				const height = document.documentElement.scrollHeight - window.innerHeight;
				const dashoffset = pathLength - (getTop() * pathLength / height);
	  
				scrollUpSvgPatch.style.strokeDashoffset = dashoffset;
			};
	  
			//onScroll
			window.addEventListener('scroll', () => {
				updateDashoffset();
	  
				if (getTop() > offset) {
					scrollUp.classList.add('scroll-up-active')
				} else {
					scrollUp.classList.remove('scroll-up-active')
				}
			});
	  
			//click
			scrollUp.addEventListener('click', () => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});  



			//pop-up
		let isMobile = {
			Android: function() {return navigator.userAgent.match(/Android/i);},
			BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
			iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
			Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
			Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
			any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
		};
		
		const popUp = document.querySelector('.links__sub-items'),
			  openPopUp = document.querySelector('.links__item-pop-up'),
			  overlayPopUp = document.querySelector('.overlay__pop-up'),
			  link = document.querySelector('.links__sub-item');

		if(isMobile.any()){
			openPopUp.classList.add('touch');

			link.addEventListener('click', () => {
				overlayPopUp.style.display = "none";
				popUp.style.display = 'none';
			});

			openPopUp.addEventListener('click', () => {
				popUp.style.display = 'block';
				overlayPopUp.style.display = 'block';
			});
	
			overlayPopUp.addEventListener('click', (e) => {
				if (e.target == overlayPopUp) {
					overlayPopUp.style.display = "none";
					popUp.style.display = 'none';
				}
			});
		}else {
			openPopUp.classList.add('mouse');
		}
	




			
	//modal
	  const btn = document.querySelectorAll('.btn-open-modal'),
			modal = document.querySelector('.overlay__modal'),
			close = document.querySelector('.modal__close'),
			overlay = document.querySelector('.overlay__modal');

	  btn.forEach(item => {
		item.addEventListener('click', () => {
			modal.style.display = "block";
			document.body.style.overflow = "hidden";
		});
	  });

		close.addEventListener('click', () => {
			modal.style.display = "none";
			document.body.style.overflow = "";
		});
	  

	  overlay.addEventListener('click', (e) => {
		if (e.target == overlay) {
			overlay.style.display = "none";
			document.body.style.overflow = "";
		}
	});




	//forms
	const form = document.querySelectorAll('form'),
			inputs = document.querySelectorAll('.form-message'),
			formModal = document.querySelector('#form-modal'),
			formModalMini = document.querySelector('#thanks'),
			overlayModal = document.querySelector('.overlay__modal'),
			phoneInputs = document.querySelectorAll('input[name="user_phone"]');

	phoneInputs.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/, '');
		});
	});
	
	const message = {
		loading: 'Загрузка...',
		success: 'Дякую! Скоро ми з вами свяжемся',
		failure: 'Щось пішло не так...'
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: "POST",
			body: data
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);

			postData('mailer/smart.php', formData)
				.then(res => {
					console.log(res);
					// statusMessage.textContent = message.success;
					formModal.style.display = 'none';
					overlayModal.style.display = 'block';
					formModalMini.style.display = 'block';
					setTimeout(() => {
						formModalMini.style.display = 'none';
						formModal.style.display = 'block';
						overlayModal.style.display = 'none';
						document.body.style.overflow = "";
					}, 5000);
				})
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
	


	  //forms
		// const forms = document.querySelectorAll('form'),
		//       inputs = document.querySelectorAll('input'),
		//       phoneInputs = document.querySelectorAll('input[name="user_phone"]');
	
		// phoneInputs.forEach(item => {
		//     item.addEventListener('input', () => {
		//         item.value = item.value.replace(/\D/, '');
		//     });
		// });
		
		// const message = {
		//     loading: 'Загрузка...',
		//     success: 'Спасибо! Скоро мы с вами свяжемся',
		//     failure: 'Что-то пошло не так...'
		// };
	
		// const postData = async (url, data) => {
		//     document.querySelector('.status').textContent = message.loading;
		//     let res = await fetch(url, {
		//         method: "POST",
		//         body: data
		//     });
	
		//     return await res.text();
		// };
	
		// const clearInputs = () => {
		//     inputs.forEach(item => {
		//         item.value = '';
		//     });
		// };
	
		// forms.forEach(item => {
		//     item.addEventListener('submit', (e) => {
		//         e.preventDefault();
	
		//         let statusMessage = document.createElement('div');
		//         statusMessage.classList.add('status');
		//         item.appendChild(statusMessage);
	
		//         const formData = new FormData(item);
	
		//         postData('mailer/smart.php', formData)
		//             .then(res => {
		//                 console.log(res);
		//                 statusMessage.textContent = message.success;
		//             })
		//             .catch(() => statusMessage.textContent = message.failure)
		//             .finally(() => {
		//                 clearInputs();
		//                 setTimeout(() => {
		//                     statusMessage.remove();
		//                 }, 5000);
		//             });
		//     });
		// });


	   
	  
	
});

