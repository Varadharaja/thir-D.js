
        /*============= Creating a canvas =================*/
        let canvas = document.getElementById('glcanvas');
        gl = canvas.getContext('webgl2');
        let proj_matrix,mov_matrix , view_matrix,Pmatrix,Vmatrix, Mmatrix,index_buffer, indices,  vertex_buffer, color_buffer  ;
         let verticesLength = 0;
        vertex_buffer = gl.createBuffer ();
        index_buffer = gl.createBuffer ();
        color_buffer = gl.createBuffer ();

                /*=================== Shaders =========================*/

                let vertCode = 'attribute vec3 position;'+
                'uniform mat4 Pmatrix;'+
                'uniform mat4 Vmatrix;'+
                'uniform mat4 Mmatrix;'+
                'attribute vec3 color;'+//the color of the point
                'varying vec3 vColor;'+
     
                'void main(void) { '+//pre-built function
                   'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
                   'vColor = color;'+
                '}';
     
             let fragCode = 'precision mediump float;'+
                'varying vec3 vColor;'+
                'void main(void) {'+
                   'gl_FragColor = vec4(vColor, 1.);'+
                '}';
     
             let vertShader = gl.createShader(gl.VERTEX_SHADER);
             gl.shaderSource(vertShader, vertCode);
             gl.compileShader(vertShader);
     
             let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
             gl.shaderSource(fragShader, fragCode);
             gl.compileShader(fragShader);
     
             let shaderProgram = gl.createProgram();
             gl.attachShader(shaderProgram, vertShader);
             gl.attachShader(shaderProgram, fragShader);
             gl.linkProgram(shaderProgram);

             
        function SetWebGLParams(planes)
        {

            
         
        let vertices = [
           -1,-1,-1, 1,-1,-1, 1, 1,-1, -1, 1,-1 ,
            -1,-1, 1, 1,-1, 1, 1, 1, 1, -1, 1, 1,
           -1,-1,-1, -1, 1,-1, -1, 1, 1, -1,-1, 1,
           1,-1,-1, 1, 1,-1, 1, 1, 1, 1,-1, 1,
           -1,-1,-1, -1,-1, 1, 1,-1, 1, 1,-1,-1,
           -1, 1,-1, -1, 1, 1, 1, 1, 1, 1, 1,-1, 
        ];

        let colors = [
           5,3,7, 5,3,7, 5,3,7, 5,3,7,
           1,1,3, 1,1,3, 1,1,3, 1,1,3,
           0,0,1, 0,0,1, 0,0,1, 0,0,1,
           1,0,0, 1,0,0, 1,0,0, 1,0,0,
           1,1,0, 1,1,0, 1,1,0, 1,1,0,
           0,1,0, 0,1,0, 0,1,0, 0,1,0
        ];

        let indices = [
           0,1,2, 0,2,3, 4,5,6, 4,6,7,
           8,9,10, 8,10,11, 12,13,14, 12,14,15,
           16,17,18, 16,18,19, 20,21,22, 20,22,23 
        ];

        let vxs = [];
        let idxs = [];
        let vxLen = 0;
        colors = [];
        let vtx_pts = new Array();

        for (let plCnt= 0; plCnt<  planes.length; plCnt++)
        {


            if (planes[plCnt].Points.length == 4)
            {
               let pts = planes[plCnt].Points;
               let idx = vxs.length/3-1;

               vxs.push(pts[0].x, pts[0].y, pts[0].z);
               vxLen++;
               vxs.push(pts[1].x, pts[1].y, pts[1].z);
               vxLen++;
               vxs.push(pts[2].x, pts[2].y, pts[2].z);
               vxLen++;
               vxs.push(pts[0].x, pts[0].y, pts[0].z);
               vxLen++;
               vxs.push(pts[2].x, pts[2].y, pts[2].z);
               vxLen++;
               vxs.push(pts[3].x, pts[3].y, pts[3].z);
               vxLen++;

               idxs.push(idx+1,idx+2, idx+3);
               idxs.push(idx+1,idx+3, idx+4);
              

               let clr = planes[plCnt].Color;
               let r = clr.red;
               let g = clr.green;
               let b = clr.blue;

               //let inclinationAngle = GxUtilsNS.GxUtils.GetInclinationWithXZPlane(planes[plCnt]);
               //console.log(inclinationAngle);
               //if (isNaN(inclinationAngle) || inclinationAngle<= 90)
               {
                  colors.push(r, g,b);
                  colors.push(r, g,b);
                  colors.push(r, g,b);
                  colors.push(r, g,b);
                  colors.push(r, g,b)
                  colors.push(r, g,b)
   
               }
               /* else
               {
                  let rnd = 0.05;
                  let r1 = r - (rnd );
                  let g1 =  g - rnd;
                  let b1 =  b - rnd;
                  colors.push(r1, g1,b1);
                  colors.push(r1, g1,b1);
                  colors.push(r1, g1,b1);
                  colors.push(r1, g1,b1);
   
               }*/

               //console.log('n');
            }
            else
            {
               let idx = vxs.length;
               let centroid = GxUtilsNS.GxUtils.GetCentroid([planes[plCnt]]);
               let centroidVxIdx =vxLen;

               for (let ptCnt=1; ptCnt < planes[plCnt].Points.length; ptCnt++ )
               {
                   vxLen++;
                   if (ptCnt ==  planes[plCnt].Points.length-1)
                   {
                        vxs.push(planes[plCnt].Points[ptCnt].x,planes[plCnt].Points[ptCnt].y,planes[plCnt].Points[ptCnt].z);
                        vxs.push(centroid.x,centroid.y,centroid.z);
                        vxs.push(planes[plCnt].Points[0].x,planes[plCnt].Points[0].y,planes[plCnt].Points[0].z);

                   }
                   else
                   {
                     vxs.push(planes[plCnt].Points[ptCnt-1].x,planes[plCnt].Points[ptCnt-1].y,planes[plCnt].Points[ptCnt-1].z);
                     vxs.push(centroid.x,centroid.y,centroid.z);
                     vxs.push(planes[plCnt].Points[ptCnt].x,planes[plCnt].Points[ptCnt].y,planes[plCnt].Points[ptCnt].z);
                   }
                   
                   let clr = planes[plCnt].Color;
                   let r = clr.red;
                   let g = clr.green;
                   let b = clr.blue;
                   colors.push(r, g,b);
                   colors.push(r, g,b);
                   colors.push(r, g,b);
               }
   
            }
            
        }
        vertices = vxs;
        verticesLength = vertices.length;
        

        /*============ Defining and storing the geometry =========*/



        // Create and store data into vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Create and store data into color buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // Create and store data into index buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


        /* ====== Associating attributes to vertex shader =====*/
         Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
         Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
         Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        let position = gl.getAttribLocation(shaderProgram, "position");
        gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0) ;

        // Position
        gl.enableVertexAttribArray(position);
        gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
        let color = gl.getAttribLocation(shaderProgram, "color");
        gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

        // Color
        gl.enableVertexAttribArray(color);
        gl.useProgram(shaderProgram);

         proj_matrix = get_projection(50, canvas.width/canvas.height, 1, 1000);

        mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
         view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

        // translating z
        view_matrix[14] = view_matrix[14]-6;//zoom

    }
        /*==================== MATRIX =====================*/

        function get_projection(angle, a, zMin, zMax) {
           let ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
           return [
              0.5/ang, 0 , 0, 0,
              0, 0.5*a/ang, 0, 0,
              0, 0, -(zMax+zMin)/(zMax-zMin), -1,
              0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 
           ];
        }

     
        /*==================== Rotation ====================*/

        function rotateZ(m, angle) {
           let c = Math.cos(angle);
           let s = Math.sin(angle);
           let mv0 = m[0], mv4 = m[4], mv8 = m[8];

           m[0] = c*m[0]-s*m[1];
           m[4] = c*m[4]-s*m[5];
           m[8] = c*m[8]-s*m[9];

           m[1]=c*m[1]+s*mv0;
           m[5]=c*m[5]+s*mv4;
           m[9]=c*m[9]+s*mv8;
        }

        function rotateX(m, angle) {
           let c = Math.cos(angle);
           let s = Math.sin(angle);
           let mv1 = m[1], mv5 = m[5], mv9 = m[9];

           m[1] = m[1]*c-m[2]*s;
           m[5] = m[5]*c-m[6]*s;
           m[9] = m[9]*c-m[10]*s;

           m[2] = m[2]*c+mv1*s;
           m[6] = m[6]*c+mv5*s;
           m[10] = m[10]*c+mv9*s;
        }

        function rotateY(m, angle) {
           let c = Math.cos(angle);
           let s = Math.sin(angle);
           let mv0 = m[0], mv4 = m[4], mv8 = m[8];

           m[0] = c*m[0]+s*m[2];
           m[4] = c*m[4]+s*m[6];
           m[8] = c*m[8]+s*m[10];

           m[2] = c*m[2]-s*mv0;
           m[6] = c*m[6]-s*mv4;
           m[10] = c*m[10]-s*mv8;
        }

        /*================= Drawing ===========================*/
        let time_old = 0;

        let animate = function(time) {
            if (doAnimate)
            {
                let dt = time-time_old;
                rotateZ(mov_matrix, dt*0.000);//time
                rotateY(mov_matrix, dt*0.0009);
                rotateX(mov_matrix, dt*0.000);
                time_old = time;

                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.clearColor(1, 1, 1, 1);
                gl.clearDepth(1.0);

                gl.viewport(0.0, 0.0, canvas.width, canvas.height);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
                gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
                gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
                //gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
                  gl.drawArrays(gl.TRIANGLES,0,verticesLength/3);
                window.requestAnimationFrame(animate);
            }
        }
        //animate(0);