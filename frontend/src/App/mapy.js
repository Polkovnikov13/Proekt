/* eslint-disable max-len */
// return (
//     <>
//       <MyNavbar changeHandler={changeHandler} input={input} />
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           height: '883px',
//           backgroundColor: 'rgb(202, 202, 202)',
//           paddingTop: '11px',
//           paddingBottom: '11px',
//           paddingLeft: '1px',
//           paddingRight: '1px',
//         }}
//       >
//         {grafHalf === false ? (
//           <div style={{
//             position: 'absolute', top: '54%', left: '1%', transform: 'translateY(-50%)', width: '1.9%', height: '90%', margin: 'auto', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px 0 0 15px', textAlign: 'center', fontSize: '20px',
//           }}
//           >
//             <Button style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }} onClick={() => setGrafHalf(true)}>
//               {str2}
//             </Button>
//           </div>
//         ) : (
//           <div>123</div>
//         )}
//         {half === false ? (
//           <>
//             <div
//               className="div-list-container"
//               style={{
//                 width: '95%',
//                 height: '50%',
//                 left: '1.2%',
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 border: '6px solid rgb(202, 202, 202)',
//                 overflowX: 'auto',
//                 position: 'relative',
//               }}
//             >
//               <MyMonitoring half={half} setHalf={setHalf} input={input} />
//             </div>
//             <div
//               className="div-list-container"
//               style={{
//                 width: '94.5%',
//                 height: '50%',
//                 left: '1.2%',
//                 backgroundColor: 'white',
//                 borderRadius: '15px 15px 15px 15px',
//                 border: '6px solid white',
//                 position: 'relative',
//               }}
//             >
//               <MyMap />
//             </div>
//           </>
//         ) : (
//           <>
//             <div
//               className="div-list-container"
//               style={{
//                 width: '75%',
//                 height: '95%',
//                 padding: '15px',
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 border: '6px solid rgb(202, 202, 202)',
//                 overflowX: 'auto',
//               }}
//             >
//               <MyMonitoring half={half} setHalf={setHalf} input={input} />
//             </div>
//             <div
//               className="div-list-container"
//               style={{
//                 width: '75%',
//                 height: '5%',
//                 backgroundColor: 'white',
//                 textAlign: 'center',
//                 border: '4px solid rgb(202, 202, 202)',
//                 borderRadius: '15px',
//               }}
//             >
//               <BackToMap half={half} setHalf={setHalf} />
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
