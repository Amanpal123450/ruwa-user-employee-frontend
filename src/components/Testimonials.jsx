import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("https://ruwa-backend.onrender.com/api/feedback");
      const data = await res.json();
      console.log("Backend response:", data); // ✅ check structure
      // Safe check
      if (res.ok) {
        setTestimonials(data.feedbacks || data || []); 
        // agar backend directly array return karta hai, ya object me feedbacks key me hai
      } else {
        console.error("Error fetching testimonials:", data.message);
        setTestimonials([]);
      }
    } catch (err) {
      console.error("Network error:", err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTestimonials();
}, []);


  if (loading) {
    return (
      <section className="section testimonials__v2" id="testimonials">
        <div className="container text-center py-5">Loading testimonials...</div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="section testimonials__v2" id="testimonials">
        <div className="container text-center py-5">No testimonials yet.</div>
      </section>
    );
  }

  return (
    <section className="section testimonials__v2" id="testimonials">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <span className="subtitle text-uppercase mb-3">Testimonials</span>
            <h2 className="mb-3">What Our Clients Say</h2>
            <p>Trusted by individuals and families across India</p>
          </div>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="testimonial rounded-4 p-4 shadow-sm bg-white mx-2 h-100 border border-light">
                <div className="text-warning d-flex mb-2">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} color="#ffc107" />
                    ))}
                </div>

                <blockquote className="mb-3 text-muted">
                  &ldquo;{t.message}&rdquo;
                </blockquote>

                <div className="testimonial-author d-flex gap-3 align-items-center mt-3">
                  <img
                    className="rounded-circle img-fluid"
                    src={t.image || "/assets/images/person-sq-1-min.jpg"}
                    alt={t.name}
                    width={50}
                    height={50}
                  />
                  <strong className="fs-6">{t.name}</strong>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// import React, { useEffect, useState } from "react";
// import { FaStar, FaQuoteLeft, FaUser } from "react-icons/fa";

// export default function TestimonialsSlider() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Mock data for demonstration
//   // const mockTestimonials = [
//   //   {
//   //     id: 1,
//   //     name: "Priya Sharma",
//   //     message: "Exceptional service! The team went above and beyond to meet our requirements. Highly recommend their professional approach.",
//   //     image: null,
//   //     rating: 5
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Rajesh Kumar",
//   //     message: "Outstanding experience from start to finish. The attention to detail and customer care was remarkable.",
//   //     image: null,
//   //     rating: 5
//   //   },
//   //   {
//   //     id: 3,
//   //     name: "Anita Patel",
//   //     message: "Professional, reliable, and trustworthy. They delivered exactly what they promised within the timeline.",
//   //     image: null,
//   //     rating: 5
//   //   },
//   //   {
//   //     id: 4,
//   //     name: "Vikram Singh",
//   //     message: "Best decision we made! The quality of service exceeded our expectations completely.",
//   //     image: null,
//   //     rating: 5
//   //   }
//   // ];

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         // Simulate API call - replace with your actual endpoint
       
        
        
//         const res = await fetch("https://ruwa-backend.onrender.com/api/feedback");
//         const data = await res.json();
//         console.log(data)
        
//         if (res.ok) {
//           setTestimonials(data.feedbacks || data || []);
//         } else {
//           console.error("Error fetching testimonials:", data.message);
//           setTestimonials([]);
//         }
      
//       } catch (err) {
//         console.error("Network error:", err);
//         // setTestimonials(mockTestimonials); // Fallback to mock data
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   // Auto-slide functionality
//   useEffect(() => {
//     if (testimonials.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//       }, 4000);
      
//       return () => clearInterval(interval);
//     }
//   }, [testimonials.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
//             <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
//                   <div className="h-6 bg-gray-200 rounded mb-4"></div>
//                   <div className="h-20 bg-gray-200 rounded mb-4"></div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
//                     <div className="h-4 bg-gray-200 rounded w-24"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (testimonials.length === 0) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <div className="bg-white rounded-2xl p-12 shadow-lg">
//             <FaQuoteLeft className="text-6xl text-gray-300 mx-auto mb-6" />
//             <h3 className="text-2xl font-bold text-gray-700 mb-2">No Testimonials Yet</h3>
//             <p className="text-gray-500">Be the first to share your experience with us!</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden" id="testimonials">
//       {/* Background decorations */}
//       <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      
//       <div className="max-w-6xl mx-auto px-4 relative z-10">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
//             Testimonials
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//             What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Clients Say</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Trusted by individuals and families across India for exceptional service and results
//           </p>
//         </div>

//         {/* Desktop View - Grid */}
//         <div className="hidden lg:block">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {testimonials.slice(0, 6).map((testimonial, index) => (
//               <div key={testimonial.id || index} className="group">
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden h-full">
//                   {/* Quote icon */}
//                   <div className="absolute top-6 right-6 text-4xl text-blue-100">
//                     <FaQuoteLeft />
//                   </div>
                  
//                   {/* Rating Stars */}
//                   <div className="flex mb-6">
//                     {Array(5).fill().map((_, i) => (
//                       <FaStar key={i} className="text-yellow-400 text-lg" />
//                     ))}
//                   </div>
                  
//                   {/* Testimonial Text */}
//                   <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
//                     "{testimonial.message}"
//                   </blockquote>
                  
//                   {/* Author */}
//                   <div className="flex items-center gap-4 mt-auto">
//                     <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                       {testimonial.image ? (
//                         <img
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       ) : (
//                         testimonial.name.charAt(0).toUpperCase()
//                       )}
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
//                       <div className="text-sm text-gray-500">Verified Customer</div>
//                     </div>
//                   </div>
                  
//                   {/* Hover effect gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-500"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile View - Slider */}
//         <div className="lg:hidden relative">
//           <div className="overflow-hidden rounded-2xl">
//             <div 
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {testimonials.map((testimonial, index) => (
//                 <div key={testimonial.id || index} className="w-full flex-shrink-0 px-4">
//                   <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mx-auto max-w-md">
//                     {/* Quote icon */}
//                     <div className="text-center mb-6">
//                       <FaQuoteLeft className="text-4xl text-blue-200 mx-auto" />
//                     </div>
                    
//                     {/* Rating Stars */}
//                     <div className="flex justify-center mb-6">
//                       {Array(5).fill().map((_, i) => (
//                         <FaStar key={i} className="text-yellow-400 text-lg mx-0.5" />
//                       ))}
//                     </div>
                    
//                     {/* Testimonial Text */}
//                     <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
//                       "{testimonial.message}"
//                     </blockquote>
                    
//                     {/* Author */}
//                     <div className="flex items-center justify-center gap-4">
//                       <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                         {testimonial.image ? (
//                           <img
//                             src={testimonial.image}
//                             alt={testimonial.name}
//                             className="w-full h-full rounded-full object-cover"
//                           />
//                         ) : (
//                           testimonial.name.charAt(0).toUpperCase()
//                         )}
//                       </div>
//                       <div className="text-center">
//                         <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
//                         <div className="text-sm text-gray-500">Verified Customer</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <button 
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
          
//           <button 
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>

//           {/* Pagination Dots */}
//           <div className="flex justify-center mt-8 gap-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-200 ${
//                   currentSlide === index 
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' 
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
