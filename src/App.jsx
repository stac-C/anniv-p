import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import slideshowSoundtrackUrl from '../videoplayback.weba?url';

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP);

const ambientSoundtrackFiles = ['videoplayback.m4a', 'together.m4a', 'Aitana - Vas A Quedarte.mp4'];

const mediaFiles = [
  '2023-11-15-132033455.mp4',
  '237671447798_status_3e3763267bf94af28bf313d155984205.mp4',
  'FaceApp_1662385251310~2.jpg',
  'FB_IMG_1669050277283.jpg',
  'FB_IMG_1669051248598.jpg',
  'FB_IMG_1669051259067.jpg',
  'FB_IMG_1669051374223.jpg',
  'FB_IMG_1669051450426.jpg',
  'FB_VID_6672721525304759542.mp4',
  'IMG_20220316_182226_508.jpg',
  'IMG_5206.JPG',
  'IMG-20221120-WA0016.jpg',
  'IMG-20221120-WA0017.jpg',
  'IMG-20221120-WA0019.jpg',
  'IMG-20221120-WA0021.jpg',
  'IMG-20230417-WA0056.jpg',
  'IMG-20230417-WA0058.jpg',
  'IMG-20230417-WA0061.jpg',
  'IMG-20230417-WA0062.jpg',
  'IMG-20230420-WA0035.jpg',
  'mv_20220308180131.mp4',
  'mv_20220313182517.mp4',
  'MYXJ_20220506171713467_fast.jpg',
  'MYXJ_20220717143436956_fast.jpg',
  'MYXJ_20220721180844395_fast.jpg',
  'MYXJ_20220821113710264_fast (1).jpg',
  'MYXJ_20220821113710264_fast.jpg',
  'MYXJ_20221104171625555_fast~2.jpg',
  'MYXJ_20221104172316631_fast.jpg',
  'MYXJ_20221104172355101_fast.jpg',
  'MYXJ_20221104175207024_fast.jpg',
  'MYXJ_20221104180352385_fast.jpg',
  'MYXJ_20221217170543194_fast~2.jpg',
  'MYXJ_20230213134415013_fast.jpg',
  'MYXJ_20230322093538288_fast.jpg',
  'MYXJ_20230322172700404_save.jpg',
  'MYXJ_20230506171839469_save.jpg',
  'MYXJ_20230511133947912_save.jpg',
  'MYXJ_20230511134116098_save.jpg',
  'MYXJ_20250730143647008_save.jpg',
  'MYXJ_20250812152935397_save.jpg',
  'MYXJ_20250812153300552_save.jpg',
  'MYXJ_20250903153011815_save.jpg',
  'MYXJ_20250903153113317_save.jpg',
  'MYXJ_20250915105515827_save (1).jpg',
  'MYXJ_20250915105515827_save.jpg',
  'Screenshot_20220518-211239.png.png',
  'Screenshot_20250808-093856_Photos.jpg',
  'Snapchat-1945148252.jpg',
  'Snapchat-2044598988.jpg',
  'Snapchat-2074851872.mp4',
  'Snapchat-504986729.jpg',
];

const mediaCaptions = {
  '2023-11-15-132033455.mp4': 'Dans ce lieu chaleureux, ton portrait spontané transforme un simple instant en joli souvenir.',
  '237671447798_status_3e3763267bf94af28bf313d155984205.mp4': 'Près de la verdure et des murs colorés, ton sourire apporte de la joie à cette journée.',
  'FaceApp_1662385251310~2.jpg': 'Paola, ce portrait révèle ton assurance : avance avec la douceur et la force qui te rendent unique.',
  'FB_IMG_1669050277283.jpg': 'Ces visages réunis dans un même cadre rappellent combien les moments partagés font du bien.',
  'FB_IMG_1669051248598.jpg': 'Devant ce décor aux motifs délicats, chaque petit pas ouvre déjà de grandes possibilités.',
  'FB_IMG_1669051259067.jpg': 'Côte à côte dans cette belle entrée, vos sourires font rayonner la complicité.',
  'FB_IMG_1669051374223.jpg': 'Au milieu des ballons et des lumières, votre joie donne à la fête tout son éclat.',
  'FB_IMG_1669051450426.jpg': 'Sous les lumières du soir, ce moment partagé garde toute sa tendresse.',
  'FB_VID_6672721525304759542.mp4': 'Dans ta tenue bleue aux motifs lumineux, tu prends la pose avec une présence qui attire le regard.',
  'IMG_20220316_182226_508.jpg': 'Sous les arbres, les couleurs de ta tenue et vos sourires apportent un rayon de soleil à la journée.',
  'IMG_5206.JPG': 'Ce selfie complice capture un instant de bonheur tout simple, à garder près du cœur.',
  'IMG-20221120-WA0016.jpg': 'Dans ce portrait encadré par le jardin, un petit sourire raconte déjà beaucoup de douceur.',
  'IMG-20221120-WA0017.jpg': 'Cette ancienne photo rappelle avec tendresse le chemin parcouru et toutes les belles étapes à venir.',
  'IMG-20221120-WA0019.jpg': 'Dans cette tenue de cérémonie, tu portes déjà en toi de beaux rêves et tout un avenir à inventer.',
  'IMG-20221120-WA0021.jpg': 'Tout contre le bébé, ce moment plein de tendresse révèle la chaleur de ton cœur.',
  'IMG-20230417-WA0056.jpg': 'Dans ce jardin ensoleillé, cette étreinte dit toute la joie d’être ensemble.',
  'IMG-20230417-WA0058.jpg': 'Assises au grand air, vous partagez un instant simple qui rend le souvenir précieux.',
  'IMG-20230417-WA0061.jpg': 'Une pause au soleil, un sourire tranquille : savoure ces petits instants qui font du bien.',
  'IMG-20230417-WA0062.jpg': 'À l’ombre des arbres, votre proximité et vos sourires réchauffent cette journée.',
  'IMG-20230420-WA0035.jpg': 'Ton sourire éclaire ce portrait et rappelle qu’un instant à soi peut illuminer toute une journée.',
  'mv_20220308180131.mp4': 'Dans cette cour aux teintes chaudes, ta tenue rose et ton sourire composent un portrait plein de vie.',
  'mv_20220313182517.mp4': 'Laisse ce petit film garder la spontanéité d’un instant à toi : tu mérites de rayonner pleinement.',
  'MYXJ_20220506171713467_fast.jpg': 'Cette étreinte spontanée fait de ce portrait un joli cocon de complicité.',
  'MYXJ_20220717143436956_fast.jpg': 'Dans ta tenue en jean et ta pose assurée, on voit ton envie d’oser et de rayonner.',
  'MYXJ_20220721180844395_fast.jpg': 'Un selfie à deux, de beaux sourires et un moment de complicité qui fait du bien.',
  'MYXJ_20220821113710264_fast (1).jpg': 'Dans cette cour ensoleillée, ta robe bleue et ta pose assurée captent la lumière.',
  'MYXJ_20220821113710264_fast.jpg': 'Dans ce décor aux murs chaleureux, avance avec l’assurance et la joie qui te ressemblent.',
  'MYXJ_20221104171625555_fast~2.jpg': 'Un coin de verdure, un sourire franc : tu sais faire fleurir la joie où que tu sois.',
  'MYXJ_20221104172316631_fast.jpg': 'Au milieu des plantes, ta douceur ressort autant que la lumière sur ton visage.',
  'MYXJ_20221104172355101_fast.jpg': 'Assise près des plantes, tu prends le temps de profiter de l’instant, et cela te va si bien.',
  'MYXJ_20221104175207024_fast.jpg': 'Un portrait à deux sous le ciel ouvert : que cette belle complicité t’accompagne dans la suite.',
  'MYXJ_20221104180352385_fast.jpg': 'Dans la lumière du jour, cette proximité pleine de joie réchauffe le souvenir.',
  'MYXJ_20221217170543194_fast~2.jpg': 'À l’entrée, ton geste malicieux et ton sourire composent un portrait plein de caractère.',
  'MYXJ_20230213134415013_fast.jpg': 'Dans ce vaste hall lumineux, tu prends ta place avec une belle assurance.',
  'MYXJ_20230322093538288_fast.jpg': 'Réunies au grand air, vos sourires font de cette sortie un souvenir lumineux.',
  'MYXJ_20230322172700404_save.jpg': 'Sous le ciel ouvert et les palmiers, laisse ton regard se tourner vers tous les possibles.',
  'MYXJ_20230506171839469_save.jpg': 'Dans cette galerie baignée de lumière, avance avec la confiance qui te ressemble.',
  'MYXJ_20230511133947912_save.jpg': 'À l’ombre de l’arbre, les couleurs éclatantes de ta tenue célèbrent ta joie de vivre.',
  'MYXJ_20230511134116098_save.jpg': 'Dans ce coin de verdure, ta tenue colorée et ta sérénité invitent à profiter du moment.',
  'MYXJ_20250730143647008_save.jpg': 'Sur cette scène dédiée à la mode, créativité et élégance méritent tous les applaudissements.',
  'MYXJ_20250812152935397_save.jpg': 'Dans ce décor fleuri de défilé, ta présence célèbre le talent et le chemin parcouru.',
  'MYXJ_20250812153300552_save.jpg': 'Sous les lumières du podium, garde confiance en ton style et en tes beaux projets.',
  'MYXJ_20250903153011815_save.jpg': 'Dans cette robe claire devant la vitrine, tu rayonnes d’une élégance paisible et sûre.',
  'MYXJ_20250903153113317_save.jpg': 'Le mouvement de ta robe et ton sourire donnent à cette scène une belle légèreté.',
  'MYXJ_20250915105515827_save (1).jpg': 'Dans ta robe rose, tu poses avec naturel : la joie et la confiance te vont à merveille.',
  'MYXJ_20250915105515827_save.jpg': 'Les couleurs de ta robe et de la cour font ressortir ton énergie et ta belle présence.',
  'Screenshot_20220518-211239.png.png': 'Ces images réunies racontent un moment de fête et de bonheur partagé.',
  'Screenshot_20250808-093856_Photos.jpg': 'Dans ce décor de célébration, ton sourire ajoute une touche de tendresse à la fête.',
  'Snapchat-1945148252.jpg': 'Un selfie tout simple, un sourire lumineux et toute ta personnalité au premier plan.',
  'Snapchat-2044598988.jpg': 'Même en noir et blanc, ton calme et ton assurance font toute la lumière de ce portrait.',
  'Snapchat-2074851872.mp4': 'Chaque instant de cette vidéo célèbre ta présence : continue d’avancer avec confiance et légèreté.',
  'Snapchat-504986729.jpg': 'Ce portrait plein de douceur te rappelle combien tu es aimée, aujourd’hui et tous les jours.',
};

const galleryMedia = mediaFiles.map((file) => {
  const type = /\.mp4$/i.test(file) ? 'video' : 'image';
  const caption = mediaCaptions[file];
  if (!caption) throw new Error(`Missing caption for gallery media: ${file}`);
  return {
    src: `${import.meta.env.BASE_URL}media/picts/${encodeURIComponent(file)}`,
    type,
    caption,
    alt: caption,
  };
});

const featuredPhoto = galleryMedia.find((media) => media.type === 'image');

function FloatingScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.z = 14;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const palette = [0x164ca1, 0x3f78ce, 0x91b9ed, 0xe7bf69, 0xffffff];
    const shapes = [];
    for (let index = 0; index < 42; index += 1) {
      const radius = 0.045 + Math.random() * 0.13;
      const material = new THREE.MeshBasicMaterial({
        color: palette[index % palette.length],
        transparent: true,
        opacity: 0.28 + Math.random() * 0.4,
        wireframe: index % 7 === 0,
      });
      const geometry = index % 7 === 0
        ? new THREE.IcosahedronGeometry(radius * 1.8, 0)
        : new THREE.SphereGeometry(radius, 12, 10);
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 13, -2 - Math.random() * 10);
      particle.userData = { speed: 0.002 + Math.random() * 0.006, drift: (Math.random() - 0.5) * 0.002 };
      scene.add(particle);
      shapes.push(particle);
    }

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!reducedMotion) {
        shapes.forEach((shape) => {
          shape.position.y += shape.userData.speed;
          shape.position.x += shape.userData.drift;
          shape.rotation.x += 0.002;
          shape.rotation.y += 0.003;
          if (shape.position.y > 7) shape.position.y = -7;
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="three-scene" ref={mountRef} aria-hidden="true" />;
}

function Celebration({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return undefined;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const colors = ['#f0ca65', '#8db8fa', '#ffffff', '#e58aa4', '#6ad5ca'];
    const particles = [];
    let frame;
    let elapsed = 0;
    let lastBurst = 0;
    let previous = performance.now();
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = bounds.width * ratio;
      canvas.height = bounds.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const burst = (width, height) => {
      const originX = width * (0.18 + Math.random() * 0.64);
      const originY = height * (0.18 + Math.random() * 0.46);
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let index = 0; index < 42; index += 1) {
        const angle = (index / 42) * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.8;
        particles.push({ x: originX, y: originY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, decay: 0.012 + Math.random() * 0.014, color, size: 1 + Math.random() * 2.2 });
      }
    };
    const animate = (now) => {
      const delta = Math.min(now - previous, 32);
      previous = now;
      elapsed += delta;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (elapsed - lastBurst > 420) {
        burst(width, height);
        lastBurst = elapsed;
      }
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.vx * delta * 0.055;
        particle.y += particle.vy * delta * 0.055;
        particle.vy += delta * 0.00008;
        particle.life -= particle.decay * delta * 0.06;
        context.globalAlpha = Math.max(particle.life, 0);
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        if (particles[index].life <= 0) particles.splice(index, 1);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  if (!active) return null;
  return <div className="celebration" role="dialog" aria-modal="true" aria-label="Message d’anniversaire" aria-live="polite"><canvas ref={canvasRef} /><div className="celebration-message"><span>Paola Jessica</span><strong>Joyeux anniversaire · PAOLA</strong><small>Ta lumière ouvre les portes du soleil levant</small></div></div>;
}

function SlideshowThreeScene({ active }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!active || !mountRef.current) return undefined;
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 17);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const palette = [0xf6d36a, 0x8ec5ff, 0xffa5c9, 0xffffff, 0x7ef0d5];
    const stars = [];

    for (let index = 0; index < 36; index += 1) {
      const geometry = new THREE.SphereGeometry(0.08 + Math.random() * 0.18, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: palette[index % palette.length],
        transparent: true,
        opacity: 0.82,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, -2 - Math.random() * 12);
      mesh.userData = { speed: 0.005 + Math.random() * 0.012, drift: (Math.random() - 0.5) * 0.015 };
      group.add(mesh);
      stars.push(mesh);
    }

    scene.add(group);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.0035;
      group.rotation.x = Math.sin(Date.now() * 0.0007) * 0.35;
      stars.forEach((star) => {
        star.position.y += star.userData.speed;
        star.position.x += star.userData.drift;
        if (star.position.y > 6) star.position.y = -6;
        if (star.position.x > 8) star.position.x = -8;
        if (star.position.x < -8) star.position.x = 8;
      });
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      stars.forEach((star) => {
        star.geometry.dispose();
        star.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [active]);

  if (!active) return null;
  return <div className="slideshow-three-scene" ref={mountRef} aria-hidden="true" />;
}

function App() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [mediaOrientations, setMediaOrientations] = useState({});
  const galleryRef = useRef(null);
  const lightboxRef = useRef(null);
  const filterFlipStateRef = useRef(null);
  const zoomOriginRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const recordMediaOrientation = (src, event) => {
    const media = event.currentTarget;
    const width = media.videoWidth || media.naturalWidth;
    const height = media.videoHeight || media.naturalHeight;
    if (!width || !height) return;
    const orientation = height > width ? 'portrait' : 'landscape';
    setMediaOrientations((current) => current[src] === orientation
      ? current
      : { ...current, [src]: orientation });
  };
  const { contextSafe } = useGSAP(() => {
    if (prefersReducedMotion || !galleryRef.current) return;
    const items = galleryRef.current.querySelectorAll('.gallery-item');
    items.forEach((item) => {
      gsap.fromTo(item, {
        autoAlpha: 0,
        y: 22,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: item, start: 'top 90%', once: true },
      });
    });
  }, { scope: galleryRef });
  const animateGalleryMedia = contextSafe((event, isHovered) => {
    if (prefersReducedMotion) return;
    const media = event.currentTarget.querySelector('img, video');
    if (!media) return;
    gsap.to(media, {
      scale: isHovered ? 1.045 : 1,
      filter: isHovered ? 'brightness(0.86)' : 'brightness(1)',
      duration: isHovered ? 0.55 : 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
  const changeGalleryFilter = contextSafe((filter) => {
    if (filter === galleryFilter) return;
    if (!prefersReducedMotion && galleryRef.current) {
      filterFlipStateRef.current = Flip.getState(galleryRef.current.querySelectorAll('.gallery-item'));
    }
    setGalleryFilter(filter);
  });
  const openGalleryMedia = contextSafe((event, index) => {
    zoomOriginRef.current = prefersReducedMotion ? null : galleryMedia[index].src;
    setSelectedMedia(index);
  });
  useLayoutEffect(() => {
    const state = filterFlipStateRef.current;
    filterFlipStateRef.current = null;
    if (state && !prefersReducedMotion) {
      contextSafe(() => Flip.from(state, {
        duration: 0.65,
        ease: 'power2.inOut',
        scale: true,
        fade: true,
        stagger: 0.02,
        onComplete: () => ScrollTrigger.refresh(),
      }))();
    } else {
      ScrollTrigger.refresh();
    }
  }, [galleryFilter, prefersReducedMotion, contextSafe]);
  useLayoutEffect(() => {
    if (selectedMedia !== null && zoomOriginRef.current && !prefersReducedMotion) {
      const target = lightboxRef.current?.querySelector('[data-flip-id]');
      const source = [...(galleryRef.current?.querySelectorAll('[data-flip-id]') ?? [])]
        .find((item) => item.dataset.flipId === zoomOriginRef.current);
      zoomOriginRef.current = null;
      if (target && source) {
        contextSafe(() => Flip.fit(target, source, {
          scale: true,
          duration: 0.75,
          ease: 'power3.inOut',
          runBackwards: true,
        }))();
      }
    }
  }, [selectedMedia, prefersReducedMotion, contextSafe]);
  const [slideshow, setSlideshow] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showPatience, setShowPatience] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicNeedsGesture, setMusicNeedsGesture] = useState(false);
  const [slideshowMusicError, setSlideshowMusicError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [soundNeedsGesture, setSoundNeedsGesture] = useState(false);
  const [showLaunchPrompt, setShowLaunchPrompt] = useState(false);
  const [introVideoOpen, setIntroVideoOpen] = useState(true);
  const [canSkipIntro, setCanSkipIntro] = useState(false);
  const introDialogRef = useRef(null);
  const videoRef = useRef(null);
  const celebrationTimer = useRef(null);
  const patienceTimer = useRef(null);
  const slideshowTimer = useRef(null);
  const soundtrackRef = useRef(null);
  const slideshowSoundtrackRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(slideshowSoundtrackUrl);
    audio.loop = true;
    audio.volume = 0.8;
    slideshowSoundtrackRef.current = audio;

    return () => {
      audio.pause();
      slideshowSoundtrackRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}media/videoplayback.m4a`);
    audio.loop = true;
    audio.volume = 0.8;
    soundtrackRef.current = audio;

    return () => {
      audio.pause();
      soundtrackRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = soundtrackRef.current;
    if (!audio) return;

    if (playing || slideshow) {
      audio.pause();
      setMusicPlaying(false);
      return;
    }

    const track = ambientSoundtrackFiles[Math.floor(Math.random() * ambientSoundtrackFiles.length)];
    audio.src = `${import.meta.env.BASE_URL}media/${encodeURIComponent(track)}`;
    audio.load();
    setMusicNeedsGesture(false);
    audio.play().then(() => {
      if (playing || slideshow || audio.paused) {
        audio.pause();
        setMusicPlaying(false);
        return;
      }
      setMusicPlaying(true);
      setMusicNeedsGesture(false);
    }).catch(() => {
      if (!playing && !slideshow) {
        setMusicPlaying(false);
        setMusicNeedsGesture(true);
      }
    });
  }, [playing, slideshow]);

  useEffect(() => {
    const audio = soundtrackRef.current;
    if (!musicNeedsGesture || playing || slideshow || !audio) return undefined;

    const retryPlayback = (event) => {
      if (event.target instanceof Element
        && event.target.closest('[data-music-toggle], .film-section, .slideshow-toolbar, .lightbox')) return;
      if (!audio.paused) return;

      audio.play().then(() => {
        if (playing || slideshow || audio.paused) {
          audio.pause();
          setMusicPlaying(false);
          return;
        }
        setMusicPlaying(true);
        setMusicNeedsGesture(false);
      }).catch(() => {
        if (!playing && !slideshow) setMusicNeedsGesture(true);
      });
    };

    window.addEventListener('pointerdown', retryPlayback);
    window.addEventListener('keydown', retryPlayback);
    return () => {
      window.removeEventListener('pointerdown', retryPlayback);
      window.removeEventListener('keydown', retryPlayback);
    };
  }, [musicNeedsGesture, playing, slideshow]);

  useLayoutEffect(() => {
    const dialog = introDialogRef.current;
    if (!dialog) return;
    if (introVideoOpen && dialog.open && !dialog.matches(':modal')) {
      dialog.close();
      dialog.showModal();
    } else if (!introVideoOpen && dialog.open && dialog.matches(':modal')) {
      dialog.close();
      dialog.show();
    }
  }, [introVideoOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().then(() => {
      setPlaying(true);
      setAutoplayBlocked(false);
    }).catch(() => {
      setPlaying(false);
      setAutoplayBlocked(true);
    });
  }, []);

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      try {
        videoRef.current.muted = false;
        setMuted(false);
        await videoRef.current.play();
        setPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setPlaying(false);
        setAutoplayBlocked(true);
      }
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleIntroDiscover = () => {
    if (!canSkipIntro) {
      window.clearTimeout(patienceTimer.current);
      setShowPatience(true);
      patienceTimer.current = window.setTimeout(() => setShowPatience(false), 2800);
      return;
    }
    closeIntroVideo();
  };

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      try {
        await video.play();
        setPlaying(true);
        setSoundNeedsGesture(false);
        setAutoplayBlocked(false);
      } catch {
        setSoundNeedsGesture(true);
      }
    }
  };

// dddddd
  const closeIntroVideo = () => {
    window.clearTimeout(patienceTimer.current);
    setShowPatience(false);
    setIntroVideoOpen(false);
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const movePhoto = (direction) => {
    zoomOriginRef.current = null;
    setSelectedMedia((current) => (current + direction + galleryMedia.length) % galleryMedia.length);
  };

  const toggleMusic = async () => {
    const audio = soundtrackRef.current;
    if (!audio) return;
    if (playing || slideshow) {
      audio.pause();
      setMusicPlaying(false);
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
        if (playing || slideshow || audio.paused) {
          audio.pause();
          setMusicPlaying(false);
          return;
        }
        setMusicPlaying(true);
        setMusicNeedsGesture(false);
      } catch {
        setMusicNeedsGesture(true);
      }
    } else {
      audio.pause();
      setMusicPlaying(false);
      setMusicNeedsGesture(false);
    }
  };

  const stopSlideshow = () => {
    window.clearInterval(slideshowTimer.current);
    if (slideshowSoundtrackRef.current) {
      slideshowSoundtrackRef.current.pause();
      slideshowSoundtrackRef.current.currentTime = 0;
    }
    setSlideshow(false);
    setSelectedMedia(null);
  };

  const startSlideshow = async () => {
    const video = videoRef.current;
    if (video && !video.paused) video.pause();
    setPlaying(false);
    soundtrackRef.current?.pause();
    setMusicPlaying(false);
    setSelectedMedia(0);
    setSlideshow(true);
    setSlideshowMusicError(false);
    try {
      const audio = slideshowSoundtrackRef.current;
      if (!audio) throw new Error('Slideshow soundtrack is unavailable');
      await audio.play();
    } catch {
      setSlideshowMusicError(true);
    }
    setShowLaunchPrompt(false);
  };

  useEffect(() => {
    if (!slideshow) return undefined;
    slideshowTimer.current = window.setInterval(() => {
      setSelectedMedia((current) => (current + 1) % galleryMedia.length);
    }, 3200);
    return () => {
      window.clearInterval(slideshowTimer.current);
    };
  }, [slideshow]);

  useEffect(() => () => {
    window.clearTimeout(celebrationTimer.current);
    window.clearTimeout(patienceTimer.current);
    window.clearInterval(slideshowTimer.current);
    soundtrackRef.current?.pause();
    soundtrackRef.current = null;
    slideshowSoundtrackRef.current?.pause();
  }, []);

  const replayVideo = async () => {
    window.clearTimeout(celebrationTimer.current);
    window.clearTimeout(patienceTimer.current);
    setShowPatience(false);
    setShowLaunchPrompt(false);
    setCelebrating(false);
    setIntroVideoOpen(true);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    setMuted(false);
    try {
      await video.play();
      setPlaying(true);
      setAutoplayBlocked(false);
      setSoundNeedsGesture(false);
    } catch {
      setPlaying(false);
      setAutoplayBlocked(true);
    }
  };

  const handleVideoEnded = () => {
    setCanSkipIntro(true);
    window.clearTimeout(patienceTimer.current);
    setShowPatience(false);
    setCelebrating(true);
    setPlaying(false);
    celebrationTimer.current = window.setTimeout(() => {
      setCelebrating(false);
      setIntroVideoOpen(false);
      setShowLaunchPrompt(true);
      setPlaying(false);
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }, 10000);
  };

  const handleVideoPlay = () => {
    slideshowSoundtrackRef.current?.pause();
    setPlaying(true);
    setAutoplayBlocked(false);
  };

  useEffect(() => {
    if (selectedMedia === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (slideshow) stopSlideshow();
        setSelectedMedia(null);
      }
      if (event.key === 'ArrowRight') movePhoto(1);
      if (event.key === 'ArrowLeft') movePhoto(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedMedia, slideshow]);

  useEffect(() => {
    if (selectedMedia === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMedia]);

  useEffect(() => {
    if (!introVideoOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introVideoOpen]);

  const closeAlbum = () => {
    if (slideshow) stopSlideshow();
    zoomOriginRef.current = null;
    setSelectedMedia(null);
  };

  return (
    <main>
      <section className="film-section">
        <div className="film-inner">
          <div className="film-copy"><p className="eyebrow"><span /> 22 novembre · Joyeux anniversaire</p><h2>Une lumière<br /><em>qui rayonne.</em></h2><p>Paola Jessica, ta lumière brille intensément. Les portes du soleil levant seront toujours là pour t’accompagner et te faire avancer.</p></div>
          
            <dialog ref={introDialogRef} open className={`video-shell${celebrating ? ' is-celebrating' : ''}${introVideoOpen ? ' is-intro' : ''}`} onCancel={(event) => { event.preventDefault(); if (canSkipIntro && !celebrating) closeIntroVideo(); }}>
            <video ref={videoRef} src={`${import.meta.env.BASE_URL}media/Paola_InShot_20261122.mp4`} poster={`${import.meta.env.BASE_URL}media/picts/FB_IMG_1669050277283.jpg`} autoPlay muted={muted} controls={introVideoOpen} playsInline preload="metadata" onPlay={handleVideoPlay} onPause={() => setPlaying(false)} onEnded={handleVideoEnded} onVolumeChange={(event) => setMuted(event.currentTarget.muted)} aria-label="Film d’anniversaire de Paola Jessica" />
            {introVideoOpen && !celebrating && <button className="video-intro-close" onClick={handleIntroDiscover}><ArrowDown size={16} /> Passer la vidéo · Découvrir le site</button>}
            {showPatience && introVideoOpen && !celebrating && (
              <div className="patience-overlay" role="status" aria-live="polite">
                <span className="patience-spark patience-spark-one" aria-hidden="true">✦</span>
                <span className="patience-spark patience-spark-two" aria-hidden="true">✧</span>
                <span className="patience-spark patience-spark-three" aria-hidden="true">♥</span>
                <div className="patience-card">
                  <span className="patience-heart"><Heart size={30} fill="currentColor" /></span>
                  <p>Encore un petit instant...</p>
                  <strong>La surprise arrive !</strong>
                  <small>Profite du film jusqu’à la dernière seconde</small>
                </div>
              </div>
            )}
            {autoplayBlocked && <button className="video-start" onClick={togglePlayback}><Play size={18} fill="currentColor" /> Lancer le film avec le son</button>}
            <Celebration active={celebrating} />
            <div className="video-corner">PAOLA JESSICA · 22 NOVEMBRE<Heart size={13} fill="currentColor" /></div>
            </dialog>
            <div className="film-controls">
              <button className="control-button" onClick={togglePlayback} aria-label={playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}>{playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}</button>
              <button className="control-button" onClick={toggleSound} aria-label={muted ? 'Activer le son' : 'Couper le son'}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button>
              <button className="control-button" data-music-toggle onClick={toggleMusic} aria-label={musicPlaying ? 'Mettre la musique en pause' : 'Lancer la musique'}>{musicPlaying ? <Volume2 size={17} /> : <VolumeX size={17} />}</button>
              <span className="autoplay-label"><span className={musicPlaying ? 'live-dot' : 'live-dot is-paused'} /> {musicNeedsGesture ? 'Touchez pour lancer la musique' : musicPlaying ? 'Musique en lecture' : autoplayBlocked ? 'Touchez pour lancer le film' : soundNeedsGesture ? 'Touchez pour réactiver le son' : 'Lecture automatique avec son'}</span>
            </div>
        </div>
      </section>
      <section className="hero" id="accueil">
        <FloatingScene />
        <header className="topbar">
          <a className="wordmark" href="#accueil" aria-label="Accueil, Un jour précieux"><span className="wordmark-mark"><Heart size={15} fill="currentColor" /></span> nos beaux jours</a>
          <a className="top-link" href="#souvenirs">Les souvenirs <ArrowDown size={15} /></a>
        </header>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> 22 novembre · Une journée pour toi</p>
            <h1>PAOLA<br /><em>JESSICA</em></h1>
            <p className="hero-intro">Ta lumière brille extrêmement fort. Que les portes du soleil levant restent toujours ouvertes pour te faire avancer.</p>
            <a className="discover-link" href="#souvenirs">Découvrir tes souvenirs <span><ArrowDown size={17} /></span></a>
            <div className="hero-note"><span className="note-line" /> Joyeux anniversaire, Paola Jessica </div>
          </div>
          <div className="hero-photo-wrap">
            <div className="photo-frame">
              <img src={featuredPhoto.src} alt={featuredPhoto.alt} fetchPriority="high" />
              <div className="photo-caption"><span>La lumière de Paola</span><span>22 novembre</span></div>
            </div>
            <div className="photo-stamp"><span>Joyeux</span><strong>anniversaire</strong><Heart size={19} fill="currentColor" /></div>
            <span className="decor-dot decor-dot-one" /><span className="decor-dot decor-dot-two" />
          </div>
        </div>
        <div className="hero-footer"><span>Une lumière qui ouvre le chemin</span><span>22 NOVEMBRE</span></div>
      </section>

      <section className="memories section-wrap" id="souvenirs">
        <div className="slideshow-toolbar">
          <p role={slideshowMusicError ? 'alert' : undefined}>{slideshowMusicError ? 'La musique du diaporama n’a pas pu démarrer.' : slideshow ? 'Photos et vidéos défilent au rythme des souvenirs.' : 'Photos et vidéos, réunies pour célébrer Paola.'}</p>
          <button className="slideshow-button" onClick={slideshow ? stopSlideshow : startSlideshow}>
            {slideshow ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            {slideshow ? 'Arrêter le diaporama' : 'Lancer le diaporama'}
          </button>
        </div>
        <div className="section-heading">
          <div><p className="eyebrow"><span /> La galerie de Paola</p><h2>Des images,<br /><em>des émotions.</em></h2></div>
          <p className="section-description">Chaque photo et chaque vidéo raconte un morceau de ton chemin. Que le soleil levant éclaire toujours la suite de ton histoire.</p>
        </div>
        <div className="gallery-filters" role="group" aria-label="Filtrer les souvenirs">
          {[
            { value: 'all', label: 'Tout', count: galleryMedia.length },
            { value: 'image', label: 'Photos', count: galleryMedia.filter((media) => media.type === 'image').length },
            { value: 'video', label: 'Vidéos', count: galleryMedia.filter((media) => media.type === 'video').length },
          ].map((filter) => (
            <motion.button
              key={filter.value}
              type="button"
              className={`gallery-filter${galleryFilter === filter.value ? ' is-active' : ''}`}
              aria-pressed={galleryFilter === filter.value}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              onClick={() => changeGalleryFilter(filter.value)}
            >
              {filter.label}<span>{String(filter.count).padStart(2, '0')}</span>
            </motion.button>
          ))}
        </div>
        <div className={`gallery${galleryFilter !== 'all' ? ' is-filtered' : ''}`} aria-label="Galerie des souvenirs" ref={galleryRef}>
          {galleryMedia.map((media, index) => (
            <motion.button
              className={`gallery-item gallery-item-${index + 1}${media.type === 'video' ? ' is-video' : ''}`}
              key={media.src}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              onPointerEnter={(event) => animateGalleryMedia(event, true)}
              onPointerLeave={(event) => animateGalleryMedia(event, false)}
              onClick={(event) => openGalleryMedia(event, index)}
              aria-label={`Ouvrir ${media.type === 'video' ? 'la vidéo' : 'la photo'} ${index + 1}: ${media.alt}`}
              hidden={galleryFilter !== 'all' && media.type !== galleryFilter}
            >
              {media.type === 'video'
                ? <video data-flip-id={media.src} src={media.src} muted playsInline preload="metadata" aria-hidden="true" />
                : <img data-flip-id={media.src} src={media.src} alt="" loading="lazy" />}
              {media.type === 'video' && <span className="gallery-play" aria-hidden="true"><Play size={22} fill="currentColor" /></span>}
              <span className="gallery-caption">{media.caption}</span>
              <span className="gallery-index">{String(index + 1).padStart(2, '0')}</span>
            </motion.button>
          ))}
        </div>
      </section>


      <footer className="footer"><a className="wordmark" href="#accueil"><span className="wordmark-mark"><Heart size={15} fill="currentColor" /></span> nos beaux jours</a><p>Fait avec amour, pour ne rien oublier.</p><a href="#accueil" className="back-top">Retour en haut ↑</a></footer>

      {showLaunchPrompt && (
        <div className="celebration-prompt" role="dialog" aria-modal="true" aria-label="Confirmer le lancement du diaporama">
          <div className="prompt-card">
            <p>Un dernier souvenir</p>
            <h3>On CONTINUE ?</h3>
            <div className="prompt-actions">
              <button onClick={startSlideshow}>Oui, lancer </button>
              <button onClick={replayVideo}>Relire la vidéo</button>
            </div>
          </div>
        </div>
      )}

      {selectedMedia !== null && (
        <div ref={lightboxRef} className={`lightbox${slideshow ? ' is-slideshow' : ''}`} role="dialog" aria-modal="true" aria-label={slideshow ? 'Diaporama plein écran' : 'Souvenir en grand format'} onClick={closeAlbum}>
          <button className="lightbox-close" aria-label="Fermer" onClick={closeAlbum}><X size={22} /></button>
          {slideshow && <button className="slideshow-stop" onClick={(event) => { event.stopPropagation(); stopSlideshow(); setSelectedMedia(null); }}><Pause size={15} /> Arrêter le diaporama</button>}
          <button className="lightbox-arrow lightbox-prev" aria-label="Souvenir précédent" onClick={(event) => { event.stopPropagation(); movePhoto(-1); }}><ArrowLeft size={23} /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            {slideshow && <SlideshowThreeScene active={slideshow} />}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={galleryMedia[selectedMedia].src}
                className={`lightbox-slide${mediaOrientations[galleryMedia[selectedMedia].src] === 'portrait' ? ' is-portrait' : ''}`}
                initial={prefersReducedMotion || zoomOriginRef.current ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeInOut' }}
              >
                {galleryMedia[selectedMedia].type === 'video'
                  ? <>
                    {slideshow && mediaOrientations[galleryMedia[selectedMedia].src] === 'portrait' && (
                      <div className="lightbox-portrait-backdrop is-video" aria-hidden="true" />
                    )}
                    <video data-flip-id={galleryMedia[selectedMedia].src} className="lightbox-video" src={galleryMedia[selectedMedia].src} controls={!slideshow} autoPlay={slideshow} muted={slideshow} playsInline preload="metadata" onLoadedMetadata={(event) => recordMediaOrientation(galleryMedia[selectedMedia].src, event)} />
                  </>
                  : <>
                    {slideshow && mediaOrientations[galleryMedia[selectedMedia].src] === 'portrait' && (
                      <div className="lightbox-portrait-backdrop" aria-hidden="true">
                        <img src={galleryMedia[selectedMedia].src} alt="" />
                      </div>
                    )}
                    <img data-flip-id={galleryMedia[selectedMedia].src} src={galleryMedia[selectedMedia].src} alt={galleryMedia[selectedMedia].alt} onLoad={(event) => recordMediaOrientation(galleryMedia[selectedMedia].src, event)} />
                  </>}
              </motion.div>
            </AnimatePresence>
            {slideshow && <div className="slideshow-message">{galleryMedia[selectedMedia].caption}</div>}
            <figcaption>{String(selectedMedia + 1).padStart(2, '0')} <span>/</span> {galleryMedia.length} · {galleryMedia[selectedMedia].caption}</figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" aria-label="Souvenir suivant" onClick={(event) => { event.stopPropagation(); movePhoto(1); }}><ArrowRight size={23} /></button>
        </div>
      )}
    </main>
  );
}

export default App;
