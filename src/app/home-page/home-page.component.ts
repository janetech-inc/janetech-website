import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnInit,
  OnDestroy } from '@angular/core';
import { HostListener } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { Subject } from 'rxjs/internal/Subject';

@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
  })

export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  
  public isSticky: boolean = false;

  @ViewChild('header', {static: false}) header: ElementRef;
  private navbarOffsetTop: number;
  private resizeObservable;

  private pageYOffsetSubject = new Subject<number>();

  constructor() {}

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event: Event|any) {
    this.pageYOffsetSubject.next(event.path[1].pageYOffset)
  }

  ngOnInit(): void {
    this.resizeObservable = this.pageYOffsetSubject
                                .asObservable()
                                .pipe(debounceTime(15))
                                .subscribe((e:number) => this.onWindowScrollEvent(e))
  }

  ngOnDestroy(): void {
    if (this.resizeObservable != null) {
      this.resizeObservable.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.navbarOffsetTop = this.header.nativeElement.offsetTop;
  }

  private onWindowScrollEvent(pageYOffset: number): void {
    this.isSticky = pageYOffset > (this.navbarOffsetTop - 150)
  }

}