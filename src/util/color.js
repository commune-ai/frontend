export const default_colors = [
  'rgb(218, 17, 17)', //red
  'rgb(218, 148, 17)', //orange
  'rgb(218, 205, 17)', // yellow 
  'rgb(99, 189, 15)', // green
  'rgb(15, 207, 150)', // teal
  'rgb(8, 180, 211)', // ocean
  'rgb(12, 114, 231)',
  'rgb(151, 12, 231)',  // purple
  'rgb(213, 12, 231)' // pink
]
export const background_colors = [
    'rgba(218, 17, 17, 0.400)', //red
    'rgba(218, 148, 17, 0.400)', //orange
    'rgba(218, 205, 17, 0.400)', // yellow 
    'rgba(99, 189, 15, 0.400)', // green
    'rgba(15, 207, 150, 0.400)', // teal
    'rgba(8, 180, 211, 0.400)', // ocean
    'rgba(12, 114, 231, 0.400)',
    'rgba(151, 12, 231, 0.400)',  // purple
    'rgba(213, 12, 231, 0.400)', // pink
  ]

export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
export function randomColor(colors=default_colors) {
    const color_index = getRndInteger(0,colors.length)
    return colors[color_index]
  }

export function getColor(color_index=0, colors=default_colors) {
    let color = colors[color_index % colors.length]
    return color
  }


