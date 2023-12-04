import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit {
  @Input() appTooltip = ''
  wrapper: HTMLDivElement = this.renderer2.createElement('div')
  tooltip: HTMLDivElement = this.renderer2.createElement('div')

  constructor(
    private host: ElementRef<HTMLElement>,
    private renderer2: Renderer2) {
  }


  ngOnInit(): void {
    this.renderer2.setAttribute(
      this.host.nativeElement,
      'title',
      this.appTooltip
    )
    this.renderer2.setStyle(this.wrapper,'position','relative')
    this.renderer2.setStyle(this.tooltip,'position', 'absolute')
    this.renderer2.setStyle(this.tooltip,'top','0')
    this.renderer2.setStyle(this.wrapper,'display','none')
    this.renderer2.setStyle(this.tooltip,'left','20px')
    this.renderer2.setStyle(this.tooltip,'background','#ccc')
    this.renderer2.setStyle(this.tooltip,'border','1px solid #000')
    this.renderer2.setStyle(this.tooltip,'padding','2px')
    this.renderer2.appendChild(this.host.nativeElement,this.wrapper)
    this.renderer2.appendChild(this.wrapper,this.tooltip)
    this.renderer2.appendChild(this.tooltip,this.renderer2.createText(this.appTooltip))
    this.renderer2.listen(this.host.nativeElement,'mouseenter',()=>{this.renderer2.setStyle(this.wrapper,'display','block')})
    this.renderer2.listen(this.host.nativeElement,'mouseleave',()=>{this.renderer2.setStyle(this.wrapper,'display','none')})
  }
}
