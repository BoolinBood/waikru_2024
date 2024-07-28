import React from 'react'

interface Props{
  tray: TrayType
}
const see: React.FC<Props> = ({tray}) => {
  return (
    <div className='container'>
        
        <div className="box">
          <div className="flower">
            {tray.selectedTray}
            <img src="/assets/seemore/flower.svg" alt="close" width={120} height={120} />
          </div>
          <h1 className="name">{tray.name} คนระยองรักจริงหวังแต่ง</h1>
          <p className="message">{tray.message}
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Iusto consequatur id possimus reiciendis tempore asperiores?
          </p>
        </div>
    </div>
  )
}

export default see